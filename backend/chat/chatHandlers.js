module.exports = (io, socket) => {
  const Joi = require("joi");

  const chatDb = require("../models/chat");

  const sendMessage = async (payload, callback) => {
    if (callback && typeof callback !== "function") {
      socket.disconnect();
    }

    if (!socket.data.chatId) {
      callback({
        status: "No room",
        message: "You must join a room before sending a message"
      });
      socket.disconnect();
    }

    const schema = Joi.object({
      name: Joi.string().required(),
      message: Joi.string().required()
    });

    const { error } = schema.validate(payload);
    if (error) {
      return callback({ status: "Bad request", message: error.message });
    }

    const message = {
      senderUserId: socket.data.user.id,
      name: payload.name,
      message: payload.message,
      sentAt: new Date()
    };

    io.to(socket.data.chatId).emit("message", message);

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
    const usersAreFriends = await chatDb.checkFriends(userId, friendUser.id);
    if (usersAreFriends) {
      let chatId = await chatDb.getDirectChatID(userId, friendUser.id); // TODO: better error handling. DB access should be in try/catch.
      if (!chatId) {
        chatId = await chatDb.createDirectChat(userId, friendUser.id);
        if (!chatId) {
          callback(
            `Failed to start direct chat with ${friendUser.firstname} ${friendUser.lastname}. Please try again.`
          );
          return socket.disconnect();
        }
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
    if (typeof callback !== "function") {
      return socket.disconnect();
    }

    if (!socket.data.chatId) {
      callback({
        status: "No room",
        message: "You must join a room before you can fetch the message history"
      });
      socket.disconnect();
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
    // TODO: better error handling. DB access should be in try/catch.
    if (chatDb.checkFriends(userId, friendUser.id)) {
      const chatId = await chatDb.getDirectChatID(userId, friendUser.id);
      if (!chatId) {
        callback("Failed to fetch message history");
        return;
      }
      const messageHistory = await chatDb.getMessageHistory(chatId);
      if (messageHistory) {
        const messages = [];
        messageHistory.map((message) => {
          const tempMessage = {
            senderUserId: message.sender,
            name: `${message.firstname} ${message.lastname}`,
            message: message.message,
            sentAt: message.sent_at
          };
          messages.push(tempMessage);
        });
        socket.emit("message-history", messages);
      }
    }
  };

  socket.on("join-direct-chat", joinDirectChat);
  socket.on("get-message-history", getMessageHistory);
  socket.on("send-message", sendMessage);
};
