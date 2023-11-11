const request = require("supertest");
const app = require("../app");
const {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest
} = require("@jest/globals");
const { promisePool } = require("../db/pool");
const jwt = require("jsonwebtoken");
const users = require("../models/users");

describe("sendFriendRequest", () => {
  let senderUser;
  let receiverUser;

  const createUser = async (email, password) => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email, password });
    return { id: response.body.id, email, token: response.body.token };
  };

  beforeEach(async () => {
    // Create two users for testing.
    senderUser = await createUser("example-sender@example.com", "Password123!");
    receiverUser = await createUser(
      "example-receiver@example.com",
      "Password123!"
    );
  });

  afterEach(async () => {
    // Delete the users created for testing.
    await promisePool.query("DELETE FROM users WHERE id IN (?)", [
      [senderUser.id, receiverUser.id]
    ]);
  });

  it("should return 400 if senderUserId is not a valid UUID", async () => {
    const response = await request(app)
      .post(`/api/users/invalid-uuid/friend-requests/${receiverUser.id}`)
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"senderUserId" must be a valid GUID');
  });

  it("should return 400 if receiverUserId is not a valid UUID", async () => {
    const response = await request(app)
      .post(`/api/users/${senderUser.id}/friend-requests/invalid-uuid`)
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"receiverUserId" must be a valid GUID');
  });

  it("should return 401 if senderUserId does not match authenticated user", async () => {
    const response = await request(app)
      .post(`/api/users/${senderUser.id}/friend-requests/${receiverUser.id}`)
      .set("Authorization", "Bearer invalid-token")
      .send();

    expect(response.status).toBe(401);
  });

  it("should return 400 if senderUserId and receiverUserId are the same", async () => {
    const response = await request(app)
      .post(`/api/users/${senderUser.id}/friend-requests/${senderUser.id}`)
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Sender and receiver cannot be the same user"
    );
  });

  it("should return 400 if receiverUserId does not exist", async () => {
    const response = await request(app)
      .post(
        `/api/users/${senderUser.id}/friend-requests/00000000-0000-0000-0000-000000000000`
      )
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "No user exists with given receiverUserId"
    );
  });

  it("should return 200 if request is valid", async () => {
    const response = await request(app)
      .post(`/api/users/${senderUser.id}/friend-requests/${receiverUser.id}`)
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(200);
  });
});

describe("getSentFriendRequests", () => {
  let user;
  let receiverUser;

  const createUser = async (email, password) => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email, password });

    return { id: response.body.id, email, token: response.body.token };
  };

  beforeEach(async () => {
    user = await createUser("example-user@example.com", "Password123!");
    receiverUser = await createUser(
      "example-receiver-user@example.com",
      "Password123!"
    );
  });

  afterEach(async () => {
    await promisePool.query("DELETE FROM users WHERE id in (?)", [
      [user.id, receiverUser.id]
    ]);
  });

  it("should return 400 if userid is not a valid UUID", async () => {
    const response = await request(app)
      .get("/api/users/invalid-uuid/friend-requests/sent")
      .auth(user.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"userid" must be a valid GUID');
  });

  it("should return 403 if userid does not match authenticated user", async () => {
    const response = await request(app)
      .get(
        "/api/users/00000000-0000-0000-0000-000000000000/friend-requests/sent"
      )
      .auth(user.token, { type: "bearer" });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 200 and the list of sent friend requests if request is valid", async () => {
    // get the list of sent friend requests before sending a friend request
    const responseBefore = await request(app)
      .get(`/api/users/${user.id}/friend-requests/sent`)
      .auth(user.token, { type: "bearer" });

    expect(responseBefore.status).toBe(200);
    expect(Array.isArray(responseBefore.body)).toBe(true);
    expect(responseBefore.body.length).toBe(0);

    // send a friend request
    await request(app)
      .post(`/api/users/${user.id}/friend-requests/${receiverUser.id}`)
      .auth(user.token, { type: "bearer" });

    // get the list of sent friend requests after sending a friend request
    const responseAfter = await request(app)
      .get(`/api/users/${user.id}/friend-requests/sent`)
      .auth(user.token, { type: "bearer" });

    expect(responseAfter.status).toBe(200);
    expect(Array.isArray(responseAfter.body)).toBe(true);
    expect(responseAfter.body.length).toBe(1);

    // check that the friend request is in the list
    const friendRequest = responseAfter.body[0];
    expect(friendRequest.requester_user_id).toBe(user.id);
    expect(friendRequest.requested_friend_user_id).toBe(receiverUser.id);
  });
});

describe("getReceivedFriendRequests", () => {
  let user;
  let receiverUser;

  const createUser = async (email, password) => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email, password });
    return { id: response.body.id, email, token: response.body.token };
  };

  beforeEach(async () => {
    user = await createUser("example-user@example.com", "Password123!");
    receiverUser = await createUser(
      "example-receiver-user@example.com",
      "Password123!"
    );
  });

  afterEach(async () => {
    await promisePool.query("DELETE FROM users WHERE id in (?)", [
      [user.id, receiverUser.id]
    ]);
  });

  it("should return 400 if userid is not a valid UUID", async () => {
    const response = await request(app)
      .get("/api/users/invalid-uuid/friend-requests/received")
      .auth(user.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"userid" must be a valid GUID');
  });

  it("should return 403 if userid does not match authenticated user", async () => {
    const response = await request(app)
      .get(
        "/api/users/00000000-0000-0000-0000-000000000000/friend-requests/received"
      )
      .auth(user.token, { type: "bearer" });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 200 and the list of received friend requests if request is valid", async () => {
    // get the list of sent friend requests before sending a friend request
    const responseBefore = await request(app)
      .get(`/api/users/${receiverUser.id}/friend-requests/received`)
      .auth(receiverUser.token, { type: "bearer" });

    expect(responseBefore.status).toBe(200);
    expect(Array.isArray(responseBefore.body)).toBe(true);
    expect(responseBefore.body.length).toBe(0);

    // send a friend request
    await request(app)
      .post(`/api/users/${user.id}/friend-requests/${receiverUser.id}`)
      .auth(user.token, { type: "bearer" });

    // get the list of sent friend requests after sending a friend request
    const responseAfter = await request(app)
      .get(`/api/users/${receiverUser.id}/friend-requests/received`)
      .auth(receiverUser.token, { type: "bearer" });

    expect(responseAfter.status).toBe(200);
    expect(Array.isArray(responseAfter.body)).toBe(true);
    expect(responseAfter.body.length).toBe(1);

    // check that the friend request is in the list
    const friendRequest = responseAfter.body[0];
    expect(friendRequest.requester_user_id).toBe(user.id);
    expect(friendRequest.requested_friend_user_id).toBe(receiverUser.id);
  });
});

describe("acceptOrDenyFriendRequest", () => {
  let friendRequestId;
  let token;
  beforeEach(async () => {
    // Create two users for testing.
    await promisePool.query(
      "INSERT INTO users (id, email, password, role_id) VALUES (?, ?, ?, ?), (?, ?, ?, ?)",
      [
        "F31FF197-88D3-4F45-A566-B8E7DC6BAF42",
        "exampleuser132213@example.com",
        "imagine a hashed password here",
        1,
        "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B",
        "exampleuser543534@example.com",
        "imagine a hashed password here",
        1
      ]
    );

    const friendRequestQuery = await promisePool.query(
      "INSERT INTO friend_requests (requester_user_id, requested_friend_user_id) VALUES (?, ?)",
      [
        "F31FF197-88D3-4F45-A566-B8E7DC6BAF42",
        "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B"
      ]
    );
    friendRequestId = friendRequestQuery[0].insertId;

    // Get the token for the requested user
    token = await jwt.sign(
      { id: "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B", role_id: 1 },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  });

  afterEach(async () => {
    await promisePool.query("DELETE FROM users WHERE id IN (?)", [
      [
        "F31FF197-88D3-4F45-A566-B8E7DC6BAF42",
        "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B"
      ]
    ]);
  });

  it("should accept a friend request", async () => {
    const response = await request(app)
      .put(
        `/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friend-requests/${friendRequestId}`
      )
      .send({ status: "accepted" })
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe(
      "Friend request accepted and friendship created"
    );
  });

  it("should deny a friend request", async () => {
    const response = await request(app)
      .put(
        `/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friend-requests/${friendRequestId}`
      )
      .send({ status: "denied" })
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Friend request denied");
  });

  it("should return 400 for invalid status", async () => {
    const response = await request(app)
      .put(
        `/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friend-requests/${friendRequestId}`
      )
      .send({ status: "invalid" })
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '"status" must be one of [accepted, denied]'
    );
  });

  it("should return 400 for invalid user ID", async () => {
    const response = await request(app)
      .put(`/api/users/invalid-user-id/friend-requests/${friendRequestId}`)
      .send({ status: "accepted" })
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"userid" must be a valid GUID');
  });

  it("should return 403 for unauthorized user", async () => {
    const response = await request(app)
      .put(
        `/api/users/F31FF197-88D3-4F45-A566-B8E7DC6BAF42/friend-requests/${friendRequestId}`
      )
      .send({ status: "accepted" })
      .auth(token, { type: "bearer" }); // token is for a different user

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 403 for valid user ID, that is not a pending friend request", async () => {
    // Generate a token for a user that does not have a pending friend request
    const token_ddff = await jwt.sign(
      { id: "ddfffcd7-983c-4f83-b998-884c36bea194", role_id: 1 },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .put(
        `/api/users/ddfffcd7-983c-4f83-b998-884c36bea194/friend-requests/${friendRequestId}`
      )
      .send({ status: "accepted" })
      .auth(token_ddff, { type: "bearer" });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 400 for non-existing friend request ID", async () => {
    const response = await request(app)
      .put(
        `/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friend-requests/999`
      )
      .send({ status: "accepted" })
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "No friend request exists with given friendRequestId"
    );
  });

  it("should return 500 for internal error during friend request acceptance", async () => {
    // Mock an internal error during the acceptance process
    jest.spyOn(users, "acceptFriendRequest").mockImplementation(() => {
      throw new Error("Internal error");
    });

    const response = await request(app)
      .put(
        `/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friend-requests/${friendRequestId}`
      )
      .send({ status: "accepted" })
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal error");

    // Restore the original function to avoid side effects on other tests
    jest.spyOn(users, "acceptFriendRequest").mockRestore();
  });

  it("should return 500 for internal error during friend request deny", async () => {
    // Mock an internal error during the acceptance process
    jest.spyOn(users, "updateFriendRequest").mockImplementation(() => {
      throw new Error("Internal error");
    });

    const response = await request(app)
      .put(
        `/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friend-requests/${friendRequestId}`
      )
      .send({ status: "denied" })
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal error");

    // Restore the original function to avoid side effects on other tests
    jest.spyOn(users, "updateFriendRequest").mockRestore();
  });

  it("should return 400 if friend request exists but is not pending", async () => {
    // Deny the friend request before so that it is no longer pending
    await request(app)
      .put(
        `/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friend-requests/${friendRequestId}`
      )
      .send({ status: "denied" })
      .auth(token, { type: "bearer" });

    // Try to accept the friend request
    const response = await request(app)
      .put(
        `/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friend-requests/${friendRequestId}`
      )
      .send({ status: "accepted" })
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Friend request is not pending");
  });
});

describe("getFriends", () => {
  let friendRequestId;
  let token;
  beforeEach(async () => {
    // Create two users for testing.
    await promisePool.query(
      "INSERT INTO users (id, email, password, role_id) VALUES (?, ?, ?, ?), (?, ?, ?, ?)",
      [
        "F31FF197-88D3-4F45-A566-B8E7DC6BAF42",
        "exampleuser132213@example.com",
        "imagine a hashed password here",
        1,
        "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B",
        "exampleuser543534@example.com",
        "imagine a hashed password here",
        1
      ]
    );

    const friendRequestQuery = await promisePool.query(
      "INSERT INTO friend_requests (requester_user_id, requested_friend_user_id) VALUES (?, ?)",
      [
        "F31FF197-88D3-4F45-A566-B8E7DC6BAF42",
        "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B"
      ]
    );
    friendRequestId = friendRequestQuery[0].insertId;

    // Get the token for the requested user
    token = await jwt.sign(
      { id: "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B", role_id: 1 },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    await users.acceptFriendRequest(
      friendRequestId,
      "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B",
      "F31FF197-88D3-4F45-A566-B8E7DC6BAF42"
    );
  });

  afterEach(async () => {
    await promisePool.query("DELETE FROM users WHERE id IN (?)", [
      [
        "F31FF197-88D3-4F45-A566-B8E7DC6BAF42",
        "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B"
      ]
    ]);
  });

  it("should return 200 and a list of friends", async () => {
    const response = await request(app)
      .get(`/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friends`)
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].user_id).toBe(
      "7BB4A1C9-187B-4A68-885C-3BE6B1828B6B"
    );
    expect(response.body[0].friend_user_id).toBe(
      "F31FF197-88D3-4F45-A566-B8E7DC6BAF42"
    );
  });

  it("should return 400 for invalid user ID", async () => {
    const response = await request(app)
      .get(`/api/users/invalid-user-id/friends`)
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"userid" must be a valid GUID');
  });

  it("should return 403 for unauthorized user", async () => {
    const response = await request(app)
      .get(`/api/users/F31FF197-88D3-4F45-A566-B8E7DC6BAF42/friends`)
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 400 for non-existing user ID", async () => {
    const validTokenForTheUserID = await jwt.sign(
      { id: "00000000-0000-0000-0000-000000000000", role_id: 1 },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .get(`/api/users/00000000-0000-0000-0000-000000000000/friends`)
      .auth(validTokenForTheUserID, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("No user exists with given userid");
  });

  it("should return 500 for internal error during friend retrieval", async () => {
    // Mock an internal error during friend retrieval
    jest.spyOn(users, "findFriendsByUserId").mockImplementation(() => {
      throw new Error("Internal error");
    });

    const response = await request(app)
      .get(`/api/users/7BB4A1C9-187B-4A68-885C-3BE6B1828B6B/friends`)
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal error");

    // Restore the original function to avoid side effects on other tests
    jest.spyOn(users, "findFriendsByUserId").mockRestore();
  });
});

describe("unFriend", () => {
  let friendRequestId;
  let token;
  beforeEach(async () => {
    // Create 3 users for testing. First two will be friends, third will not.
    await promisePool.query(
      "INSERT INTO users (id, email, password, role_id) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)",
      [
        "70C2B79E-A6C3-42A3-9CF7-D09FEEF62268",
        "exampleuser132213@example.com",
        "imagine a hashed password here",
        1,
        "6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9",
        "exampleuser543534@example.com",
        "imagine a hashed password here",
        1,
        "8AED864A-4C16-4F26-AE5B-7299CC051351",
        "exampleuser543534@example.com",
        "imagine a hashed password here",
        1
      ]
    );

    const friendRequestQuery = await promisePool.query(
      "INSERT INTO friend_requests (requester_user_id, requested_friend_user_id) VALUES (?, ?)",
      [
        "70C2B79E-A6C3-42A3-9CF7-D09FEEF62268",
        "6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9"
      ]
    );
    friendRequestId = friendRequestQuery[0].insertId;

    // Get the token for the requested user
    token = await jwt.sign(
      { id: "6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9", role_id: 1 },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    // Only accept the friend request for the first two users
    await users.acceptFriendRequest(
      friendRequestId,
      "6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9",
      "70C2B79E-A6C3-42A3-9CF7-D09FEEF62268"
    );
  });

  afterEach(async () => {
    // Delete the users created for testing.
    await promisePool.query("DELETE FROM users WHERE id IN (?)", [
      [
        "70C2B79E-A6C3-42A3-9CF7-D09FEEF62268",
        "6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9",
        "8AED864A-4C16-4F26-AE5B-7299CC051351"
      ]
    ]);
  });

  it("should return 200 and unfriend the users", async () => {
    const response = await request(app)
      .delete(
        `/api/users/6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9/friends/70C2B79E-A6C3-42A3-9CF7-D09FEEF62268`
      )
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Unfriended");
  });

  it("should return 400 for invalid user ID", async () => {
    const response = await request(app)
      .delete(
        `/api/users/invalid-user-id/friends/70C2B79E-A6C3-42A3-9CF7-D09FEEF62268`
      )
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"userid" must be a valid GUID');
  });

  it("should return 400 for invalid friend ID", async () => {
    const response = await request(app)
      .delete(
        `/api/users/6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9/friends/invalid-friend-id`
      )
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"friendId" must be a valid GUID');
  });

  it("should return 403 for unauthorized user", async () => {
    const response = await request(app)
      .delete(
        `/api/users/70C2B79E-A6C3-42A3-9CF7-D09FEEF62268/friends/6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9`
      )
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should return 404 for non-existing user ID", async () => {
    const validTokenForTheUserID = await jwt.sign(
      { id: "00000000-0000-0000-0000-000000000000", role_id: 1 },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    const response = await request(app)
      .delete(
        `/api/users/00000000-0000-0000-0000-000000000000/friends/70C2B79E-A6C3-42A3-9CF7-D09FEEF62268`
      )
      .auth(validTokenForTheUserID, { type: "bearer" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No user exists with given userid");
  });

  it("should return 404 for non-existing friend ID", async () => {
    const response = await request(app)
      .delete(
        `/api/users/6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9/friends/00000000-0000-0000-0000-000000000000`
      )
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No user exists with given friendId");
  });

  it("should return 404 if users are not friends", async () => {
    const response = await request(app)
      .delete(
        `/api/users/6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9/friends/8AED864A-4C16-4F26-AE5B-7299CC051351`
      )
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Users are not friends");
  });

  it("should return 500 for internal error during unfriending", async () => {
    // Mock an internal error during unfriending
    jest.spyOn(users, "unFriend").mockImplementation(() => {
      throw new Error("Internal error");
    });

    const response = await request(app)
      .delete(
        `/api/users/6FA3B831-7B92-4575-9BB5-C29A5E8E3FC9/friends/70C2B79E-A6C3-42A3-9CF7-D09FEEF62268`
      )
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal error");

    // Restore the original function to avoid side effects on other tests
    jest.spyOn(users, "unFriend").mockRestore();
  });
});
