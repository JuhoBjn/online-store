const {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach
} = require("@jest/globals");
const jwt = require("jsonwebtoken");

const { io } = require("../app");
const ioc = require("socket.io-client");

const { promisePool } = require("../db/pool");

describe("The chat backend", () => {
  let chatServerPort, chatServer, clientSocket, client2Socket;
  let larrysId, larrysToken;
  let lottasToken;

  beforeAll(async () => {
    // Start up Socket.io server and connect two client sockets.
    chatServerPort = process.env.SOCKET_IO_PORT || 5005;
    chatServer = io.listen(chatServerPort);

    // Log in a test user
    // Test data must be added to database.
    const queryString =
      "SELECT id, role_id, premium FROM users WHERE email = ?;";
    let [larry] = await promisePool.query(queryString, ["larrys@test.com"]);
    larry = { ...larry[0] };
    larrysId = larry.id;
    larrysToken = jwt.sign(larry, process.env.JWT_KEY);

    // Log in a second test user.
    let [lotta] = await promisePool.query(queryString, ["lottas@test.com"]);
    lotta = { ...lotta[0] };
    lottasToken = jwt.sign(lotta, process.env.JWT_KEY);
  });

  afterAll(async () => {
    if (clientSocket && clientSocket.connected) clientSocket.disconnect();
    if (client2Socket && client2Socket.connected) client2Socket.disconnect();
    chatServer.close();
  });

  beforeEach((done) => {
    clientSocket = ioc(`http://localhost:${chatServerPort}`, {
      auth: {
        token: larrysToken
      }
    });
    client2Socket = ioc(`http://localhost:${chatServerPort}`, {
      auth: {
        token: lottasToken
      }
    });
    setTimeout(() => {
      done();
    }, 1000);
  });

  afterEach(() => {
    if (clientSocket && clientSocket.connected) {
      clientSocket.disconnect();
    }
    if (client2Socket && client2Socket.connected) {
      client2Socket.disconnect();
    }
  });

  it("should allow a user to start a direct chat with their friend when a chat already exists", async () => {
    // User is a friend of Larry, the logged in test user.
    const friendUser = {
      id: "858560f9-fc03-43b0-b931-01213e4787ce",
      firstname: "Lotta",
      lastname: "Schmiedmann"
    };

    const response = await clientSocket.emitWithAck(
      "join-direct-chat",
      friendUser
    );

    expect(response).toBe(
      `You are now chatting with ${friendUser.firstname} ${friendUser.lastname}`
    );

    // Verify the socket was added to the correct room.
    const queryString =
      "SELECT chat_id FROM friends WHERE user_id = ? AND friend_user_id = ?;";
    const [chatId] = await promisePool.query(queryString, [
      larrysId,
      friendUser.id
    ]);
    const clientsInRoom = await chatServer.in(chatId[0].chat_id).fetchSockets();
    expect(clientsInRoom).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: clientSocket.id
        })
      ])
    );
  });

  it("should allow a user to start a direct chat with a friend when there is no prior chat", async () => {
    const friendUser = {
      id: "59158c35-8d77-43f1-bc63-3c5b4265b276",
      firstname: "Bob",
      lastname: "Builder"
    };

    const response = await clientSocket.emitWithAck(
      "join-direct-chat",
      friendUser
    );

    expect(response).toBe(
      `You are now chatting with ${friendUser.firstname} ${friendUser.lastname}`
    );

    // Verify the socket was added to the correct room.
    const queryString =
      "SELECT chat_id FROM friends WHERE user_id = ? AND friend_user_id = ?;";
    const [chatId] = await promisePool.query(queryString, [
      larrysId,
      friendUser.id
    ]);
    const clientsInRoom = await chatServer.in(chatId[0].chat_id).fetchSockets();
    expect(clientsInRoom).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: clientSocket.id
        })
      ])
    );
  });

  it("should not allow a user to start a direct chat with a user who is not their friend", async () => {
    const nonFriendUser = {
      id: "e16a6eac-9993-4137-9221-7c879337bbe4",
      firstname: "Anthony",
      lastname: "Administrator"
    };

    const response = await clientSocket.emitWithAck(
      "join-direct-chat",
      nonFriendUser
    );

    expect(response).toBe(
      `You must be friends with ${nonFriendUser.firstname} ${nonFriendUser.lastname} to message with them.`
    );
  });

  it("should not allow a user to start a direct chat without loggin in", (done) => {
    const unauthorizedSocket = ioc(`http://localhost:${chatServerPort}`);

    unauthorizedSocket.on("connect_error", (error) => {
      expect(error).toHaveProperty("message", "Authentication failed");
      done();
    });
  });

  it("should not allow a user to message a user that has been unfriended", async () => {
    const unfriendedUser = {
      id: "ddfffcd7-983c-4f83-b998-884c36bea194",
      firstname: "Thomas",
      lastname: "Tester"
    };

    const response = await clientSocket.emitWithAck(
      "join-direct-chat",
      unfriendedUser
    );

    expect(response).toBe(
      `You must be friends with ${unfriendedUser.firstname} ${unfriendedUser.lastname} to message with them.`
    );
  });

  it("should not accept a poorly formatted request when joining a direct chat", async () => {
    const wrongFormat = {
      id: "59158c35-8d77-43f1-bc63-3c5b4265b276",
      firstnme: "Bob",
      lastname: "Builder"
    };

    const response = await clientSocket.emitWithAck(
      "join-direct-chat",
      wrongFormat
    );

    expect(response).toHaveProperty("status", "Bad request");
    expect(response).toHaveProperty("message");
  });

  it("should allow a user to fetch message history", (done) => {
    const friendUser = {
      id: "858560f9-fc03-43b0-b931-01213e4787ce",
      firstname: "Lotta",
      lastname: "Schmiedmann"
    };

    clientSocket.emitWithAck("join-direct-chat", friendUser);

    clientSocket.on("message-history", (messages) => {
      expect(messages).toBeDefined();
      expect(messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            message: expect.any(String),
            sentAt: expect.any(String)
          })
        ])
      );
      done();
    });

    setTimeout(() => {
      clientSocket.emitWithAck("get-message-history", friendUser);
    }, 50);
  });

  it("should not allow a user to fetch message history without joining a room", async () => {
    const friendUser = {
      id: "858560f9-fc03-43b0-b931-01213e4787ce",
      firstname: "Lotta",
      lastname: "Schmiedmann"
    };

    const response = await clientSocket.emitWithAck(
      "get-message-history",
      friendUser
    );
    expect(response).toHaveProperty("status", "No room");
    expect(response).toHaveProperty(
      "message",
      "You must join a room before you can fetch the message history"
    );
  });

  it("should not accept a poorly formatted message when getting message history", async () => {
    const friendUser = {
      id: "858560f9-fc03-43b0-b931-01213e4787ce",
      firstname: "Lotta",
      lastname: "Schmiedmann"
    };

    await clientSocket.emitWithAck("join-direct-chat", friendUser);

    const wrongFormat = {
      id: "858560f9-fc03-43b0-b931-01213e4787ce",
      first: "Lotta",
      lastame: "Schmiedmann"
    };

    const response = await clientSocket.emitWithAck(
      "get-message-history",
      wrongFormat
    );
    expect(response).toHaveProperty("status", "Bad request");
    expect(response).toHaveProperty("message");
  });

  it("should allow a user to send a message to their friend", (done) => {
    const larry = {
      id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
      firstname: "Larry",
      lastname: "Smith"
    };

    const lotta = {
      id: "858560f9-fc03-43b0-b931-01213e4787ce",
      firstname: "Lotta",
      lastname: "Schmiedmann"
    };

    clientSocket.emitWithAck("join-direct-chat", lotta);
    client2Socket.emitWithAck("join-direct-chat", larry);

    client2Socket.on("message", (message) => {
      expect(message).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          message: expect.any(String)
        })
      );
      done();
    });

    setTimeout(() => {
      clientSocket.emitWithAck("send-message", {
        name: "Larry Smith",
        message: "Hello again!"
      });
    }, 50);
  });

  it("should not accept a poorly formatted message", async () => {
    const friendUser = {
      id: "858560f9-fc03-43b0-b931-01213e4787ce",
      firstname: "Lotta",
      lastname: "Schmiedmann"
    };

    await clientSocket.emitWithAck("join-direct-chat", friendUser);

    // Wrong key for message.
    const response = await clientSocket.emitWithAck("send-message", {
      name: "Larry Smith",
      content: "Hello!"
    });
    expect(response).toHaveProperty("status", "Bad request");
    expect(response).toHaveProperty("message");
  });

  it("should not allow a user to send a direct message if they are not in a room", async () => {
    const response = await clientSocket.emitWithAck("send-message", {
      name: "Larry Smith",
      message: "Hello?"
    });

    expect(response).toHaveProperty("status", "No room");
    expect(response).toHaveProperty(
      "message",
      "You must join a room before sending a message"
    );
  });
});
