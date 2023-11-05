const { v4: genUuid } = require("uuid");
const { promisePool } = require("../db/pool");

const models = {
  /**
   * Check if a user is friends with another user.
   * @param {string} user1 ID of user 1.
   * @param {string} user2 ID of user 2.
   * @returns {boolean} True if the users are friends, otherwise false.
   */
  checkFriends: async (user1, user2) => {
    const queryString =
      "SELECT id, is_unfriended FROM friends WHERE user_id = ? AND friend_user_id = ?;";
    const [rows] = await promisePool.query(queryString, [user1, user2]);
    return rows[0] && !rows[0].is_unfriended ? true : false;
  },
  /**
   * Get the chat ID of a direct chat between two users.
   * @param {string} user1 ID of user 1.
   * @param {string} user2 ID of user 2.
   * @returns {string | boolean} Chat ID if a direct chat between the users exists, otherwise null.
   */
  getDirectChatID: async (user1, user2) => {
    const queryString =
      "SELECT chat_id FROM friends WHERE user_id = ? AND friend_user_id = ?;";
    const [rows] = await promisePool.query(queryString, [user1, user2]);
    return rows[0]?.chat_id || null;
  },
  /**
   * Create a direct chat between two users.
   * @param {string} user1 ID of user 1.
   * @param {string} user2 ID of user 2.
   * @returns {string | null} ID of the created chat, false in case of an error.
   */
  createDirectChat: async (user1, user2) => {
    const chatId = genUuid();
    try {
      const createChatString =
        "INSERT INTO chats (chat_id, type) VALUES (?, 'direct');";
      await promisePool.query(createChatString, [chatId]);
      const updateChatIDInFriendsString =
        "UPDATE friends SET chat_id = ? WHERE user_id = ? AND friend_user_id = ? OR user_id = ? AND friend_user_id = ?;";
      await promisePool(updateChatIDInFriendsString, [
        chatId,
        user1,
        user2,
        user2,
        user1
      ]);
      return chatId;
    } catch (error) {
      console.log(`Failed to create direct chat: ${error.message}`);
      return false;
    }
  },
  /**
   * Write a message into the database.
   * @param {string} chat_id ID of the chat the message was sent to.
   * @param {string} sender ID of the user who sent the message.
   * @param {string} message Message content.
   * @returns {boolean} True if the insert succeeded, otherwise false.
   */
  addMessage: async (chat_id, sender, message) => {
    const insertString =
      "INSERT INTO messages (chat_id, sender, message) VALUES (?);";
    const [fields] = await promisePool.query(insertString, [
      [chat_id, sender, message]
    ]);
    return fields.changedRows > 0 ? true : false;
  },
  /**
   * Get message history from the database.
   * @param {string} chatId
   * @returns Array of messages
   */
  getMessageHistory: async (chatId) => {
    const queryString = `SELECT messages.id, messages.sender, users.first_name AS firstname, users.last_name AS lastname, messages.message, messages.sent_at
      FROM messages 
      LEFT JOIN users
      ON users.id = messages.sender
      WHERE chat_id = ?
      ORDER BY sent_at;`;
    const [rows] = await promisePool.query(queryString, [chatId]);
    return rows;
  }
};

module.exports = models;
