module.exports = (io, socket) => {
  const socketVerifyToken = require("../middleware/socketVerifyToken");
  io.use(socketVerifyToken);

  const Joi = require("joi");

  const chatDb = require("../models/chat");

  const sendMessage = async (payload, callback) => {
    if (!socket.data.chatId) {
      socket.emit("error", {
        status: "No room",
        message: "You must join a room before sending a message"
      });
      socket.disconnect();
    }

    if (callback && typeof callback !== "function") {
      socket.disconnect();
    }

    const schema = Joi.object({
      user: Joi.string().required(),
      message: Joi.string().required()
    });

    const { error } = schema.validate(payload);
    if (error) {
      return callback({ status: "Bad request", message: error.message });
    }

    io.to(socket.data.chatId).emit("message", payload);

    try {
      const success = await chatDb.addMessage(
        socket.data.chatId,
        socket.data.user.id,
        payload.message
      );
      if (!success) throw new Error("Failed to save message");
    } catch (error) {
      callback("Failed to save message");
    }
  };

  const joinDirectChat = async (friendUser, callback) => {
    if (typeof callback !== "function") {
      return socket.disconnect();
    }

    const schema = Joi.object({
      id: Joi.string().uuid().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required()
    });

    const { error } = schema.validate(friendUser);
    if (error) {
      return callback({ status: "Bad request", message: error.message });
    }

    const userId = socket.data.user?.id;
    if (chatDb.checkFriends(userId, friendUser.id)) {
      const chatId = await chatDb.getDirectChatID(userId, friendUser.id);
      if (!chatId) {
        callback(
          `Failed to start direct chat with ${friendUser.firstname} ${friendUser.lastname}`
        );
        return socket.disconnect();
      }
      socket.join(chatId);
      socket.data.chatId = chatId;
      callback(
        `You are now chatting with ${friendUser.firstname} ${friendUser.lastname}`
      );
    } else {
      callback(
        `You must be friends with ${friendUser.firstname} ${friendUser.lastname} to message with them.`
      );
      socket.disconnect();
    }
  };

  const getMessageHistory = async (friendUser, callback) => {
    if (!socket.data.chatId) {
      socket.emit("error", {
        status: "No room",
        message: "You must join a room before you can fetch the message history"
      });
      socket.disconnect();
    }

    if (typeof callback !== "function") {
      return socket.disconnect();
    }

    const schema = Joi.object({
      id: Joi.string().uuid().required(),
      firstname: Joi.string(),
      lastname: Joi.string()
    });

    const { error } = schema.validate(friendUser);
    if (error) {
      return callback({ status: "Bad request", message: error.message });
    }

    const userId = socket.data.user?.id;
    if (chatDb.checkFriends(userId, friendUser.id)) {
      const chatId = await chatDb.getDirectChatID(userId, friendUser.id);
      if (!chatId) {
        callback("Failed to fetch message history");
        return;
      }
      const messageHistory = await chatDb.getMessageHistory(chatId);
      if (messageHistory) {
        socket.emit("message-history", messageHistory);
      }
    }
  };

  socket.on("join-direct-chat", joinDirectChat);
  socket.on("get-message-history", getMessageHistory);
  socket.on("message", sendMessage);
};
