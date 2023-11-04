const { promisePool } = require("../db/pool");

const users = {
  /**
   * Find users based on email.
   * @param {string} email The user's email address
   * @returns User account found with email
   */
  findByEmail: async (email) => {
    const queryString = `
      SELECT users.id, users.role_id, roles.name AS role, users.first_name, users.last_name, users.email, users.postal_code, users.city, users.country, users.phone, users.premium, users.password
      FROM users
      LEFT JOIN roles ON users.role_id = roles.id
      WHERE email = ?;`;
    const [rows] = await promisePool.query(queryString, [email]);
    return rows[0] === undefined ? null : rows[0];
  },
  /**
   * Find users based on user ID.
   * @param {string} userId - The user ID
   * @returns User account found with ID
   */
  findById: async (id) => {
    const queryString = `
      SELECT users.id, roles.name AS role, users.first_name, users.last_name, users.email, users.postal_code, users.city, users.country, users.phone, users.premium, users.password
      FROM users
      LEFT JOIN roles ON users.role_id = roles.id
      WHERE users.id = ?;`;
    const [rows] = await promisePool.query(queryString, [id]);
    return rows[0] === undefined ? null : rows[0];
  },
  /**
   * Create a new user entry.
   * @param {Object} user - The user object containing user details.
   * @param {string} user.id - The user's ID.
   * @param {string} user.email - The user's email.
   * @param {string} user.password - The user's password.
   * @returns The created user object.
   */
  create: async (user) => {
    const insertString =
      "INSERT INTO users(id, email, password, role_id) SELECT ?,id FROM roles WHERE name='user';";
    await promisePool.query(insertString, [
      [user.id, user.email, user.password]
    ]);

    const fetchString = `
      SELECT id, email, role_id, premium
      FROM users
      WHERE id = ?;
      `;
    const [createdUser] = await promisePool.query(fetchString, [user.id]);
    return createdUser[0];
  },
  /**
   * Update DB fields for a user
   * @param {string} userId - The user ID
   * @param {Object} userData - object containing key value pairs to update
   * @example await update("123-456-789", {"first_name": "Mike", "last_name": "Smith"})
   */
  update: async (userId, userData) => {
    return promisePool.query("UPDATE users SET ? WHERE id = ?", [
      userData,
      userId
    ]);
  },
  /**
   * Add a friend request to the database.
   * @param {string} senderUserId - The sender's user ID
   * @param {string} receiverUserId - The receiver's user ID
   */
  addFriendRequest: async (senderUserId, receiverUserId) => {
    const queryString = `
    INSERT INTO friend_requests (requester_user_id, requested_friend_user_id)
    VALUES (?, ?);
    `;
    return await promisePool.query(queryString, [senderUserId, receiverUserId]);
  },
  /**
   * Check if friendship exists between two users.
   * @param {string} userId1 - The first user ID
   * @param {string} userId2 - The second user ID
   * @returns True if friendship exists, false otherwise
   */
  friendshipExists: async (userId1, userId2) => {
    const queryString = `
    SELECT COUNT(*) AS count
    FROM friends
    WHERE (
            (
                user_id = ?
                AND friend_user_id = ?
            )
            OR (
                user_id = ?
                AND friend_user_id = ?
            )
        )
        AND is_unfriended = 0;
    `;
    const [rows] = await promisePool.query(queryString, [
      userId1,
      userId2,
      userId2,
      userId1
    ]);
    return rows[0].count > 0;
  },
  /**
   * Check if a pending friend request exists between two users.
   * @param {string} userId1 - The first user ID
   * @param {string} userId2 - The second user ID
   * @returns True if pending friend request exists, false otherwise
   */
  pendingFriendRequestExists: async (userId1, userId2) => {
    const queryString = `
    SELECT COUNT(*) AS count
    FROM friend_requests
    WHERE (
        (
          requester_user_id = ?
          AND requested_friend_user_id = ?
        )
        OR (
          requester_user_id = ?
          AND requested_friend_user_id = ?
        )
      )
      AND is_accepted = 0
      AND is_rejected = 0;
    `;
    const [rows] = await promisePool.query(queryString, [
      userId1,
      userId2,
      userId2,
      userId1
    ]);
    return rows[0].count > 0;
  }
};

module.exports = users;
