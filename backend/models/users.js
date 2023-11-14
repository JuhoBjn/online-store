const { promisePool } = require("../db/pool");

const users = {
  /**
   * Find all users.
   * @returns all users
   */
  findAll: async () => {
    const queryString = `
      SELECT id, first_name AS firstname, last_name AS lastname, email,
      postal_code AS postalcode, city, country, phone, premium
      FROM users`;
    const [rows] = await promisePool.query(queryString);
    return rows === undefined ? null : rows;
  },
  /**
   * Find users based on id and delete it.
   * @param {string} id The user's id
   * @returns User account deleted
   */
  delete: async (id) => {
    const deleteQuery = `DELETE FROM users WHERE id=?;`;
    return await promisePool.query(deleteQuery, [id]);
  },
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
      SELECT id, email, role_id 
      FROM users
      WHERE id = ?;
      `;
    const [createdUser] = await promisePool.query(fetchString, [user.id]);
    return createdUser[0];
  },

  /**
   * Update DB fields for a user
   * @param {Object} user - User object containing key value pairs to update + user ID
   * @example await update({id: "123-456-789", first_name: "Mike", last_name: "Smith"})
   */
  update: async (user) => {
    //Bit complicated way to do this, but it works
    let updateString = `
    UPDATE users
    SET`;

    const updateValues = [];

    if (user.first_name) {
      updateString += " first_name = ?,";
      updateValues.push(user.first_name);
    }

    if (user.last_name) {
      updateString += " last_name = ?,";
      updateValues.push(user.last_name);
    }
    if (user.email) {
      updateString += " email = ?,";
      updateValues.push(user.email);
    }

    if (user.postal_code) {
      updateString += " postal_code = ?,";
      updateValues.push(user.postal_code);
    }

    if (user.city) {
      updateString += " city = ?,";
      updateValues.push(user.city);
    }

    if (user.country) {
      updateString += " country = ?,";
      updateValues.push(user.country);
    }

    if (user.phone) {
      updateString += " phone = ?,";
      updateValues.push(user.phone);
    }

    if (user.premium) {
      updateString += " premium = ?,";
      updateValues.push(user.premium);
    }

    if (user.password) {
      updateString += " password = ?,";
      updateValues.push(user.password);
    }

    if (updateValues.length > 0) {
      updateString = updateString.slice(0, -1);
    }

    updateString += " WHERE id = ?";

    updateValues.push(user.id);

    await promisePool.query(updateString, updateValues);
    const fetchString = `
      SELECT id, email, role_id, first_name, last_name, email, postal_code, city, country, phone, premium
      FROM users
      WHERE id = ?;`;
    const [updatedUser] = await promisePool.query(fetchString, [user.id]);
    return updatedUser[0];
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
  },
  /**
   * Get all sent friend requests for a user.
   * @param {string} userId - The sender user ID
   * @returns Array of friend requests
   */
  getSentFriendRequests: async (userId) => {
    const queryString = `
    SELECT 
      fr.id,
      fr.requester_user_id,
      fr.requested_friend_user_id,
      requestedFriend.first_name AS requested_friend_first_name,
      requestedFriend.last_name AS requested_friend_last_name,
      fr.is_rejected,
      fr.is_accepted,
      (
          CASE
              WHEN is_accepted = 0
              AND is_rejected = 0 THEN 1
              ELSE 0
          END
      ) as is_request_pending
    FROM friend_requests AS fr
      JOIN users AS requestedFriend ON fr.requested_friend_user_id = requestedFriend.id
    WHERE (
        requester_user_id = ?
      )
    `;
    const [rows] = await promisePool.query(queryString, [userId]);
    return rows;
  },
  /**
   * Get all received friend requests for a user.
   * @param {string} userId - The receiver user ID
   * @returns Array of friend requests
   */
  getReceivedFriendRequests: async (userId) => {
    const queryString = `
    SELECT 
      fr.id,  
      fr.requester_user_id,
      fr.requested_friend_user_id,
      requester.first_name AS requester_first_name,
      requester.last_name AS requester_last_name,
      fr.is_rejected,
      fr.is_accepted,
      (
          CASE
              WHEN is_accepted = 0
              AND is_rejected = 0 THEN 1
              ELSE 0
          END
      ) as is_request_pending
    FROM friend_requests AS fr
      JOIN users AS requester ON fr.requester_user_id = requester.id
    WHERE (
        requested_friend_user_id = ?
      )
    `;
    const [rows] = await promisePool.query(queryString, [userId]);
    return rows;
  },
  /**
   * Find single friend request by ID.
   * @param {string} friendRequestId - The request ID
   * @returns Friend request
   */
  findFriendRequestById: async (friendRequestId) => {
    const queryString = `
    SELECT fr.id,
    fr.requester_user_id,
    fr.requested_friend_user_id,
    fr.is_rejected,
    fr.is_accepted,
    (
        CASE
            WHEN is_accepted = 0
            AND is_rejected = 0 THEN 1
            ELSE 0
        END
    ) as is_request_pending
    FROM friend_requests AS fr
    WHERE fr.id = ?
    `;
    const [rows] = await promisePool.query(queryString, [friendRequestId]);
    return rows[0];
  },
  /**
   * Update friend request.
   * @param {string} friendRequestId - The request ID
   * @param {Object} friendRequestData - The request data
   */
  updateFriendRequest: async (friendRequestId, friendRequestData) => {
    return promisePool.query("UPDATE friend_requests SET ? WHERE id = ?;", [
      friendRequestData,
      friendRequestId
    ]);
  },
  /**
   * Accept friend request and add a friendship to the database.
   * @param {string} friendRequestId - The request ID
   * @param {string} userId1 - The first user ID
   * @param {string} userId2 - The second user ID
   */
  acceptFriendRequest: async (friendRequestId, userId1, userId2) => {
    let conn = null;
    try {
      conn = await promisePool.getConnection();
      (await conn).beginTransaction();

      await conn.query(
        `
        UPDATE friend_requests 
        SET is_accepted = 1
        WHERE id = ?;
        `,
        [friendRequestId]
      );

      const friendsInsertQuery = `
        INSERT INTO friends (user_id, friend_user_id, is_unfriended)
        VALUES (?, ?, 0) ON DUPLICATE KEY
        UPDATE is_unfriended = 0;
        `;

      await conn.query(friendsInsertQuery, [userId1, userId2]);
      await conn.query(friendsInsertQuery, [userId2, userId1]);
      await conn.commit();
    } catch (error) {
      if (conn) await conn.rollback();
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },
  /**
   * Find all friends for a user.
   * @param {string} userId - The user ID
   * @returns Array of friends
   */
  findFriendsByUserId: async (userId) => {
    const queryString = `
    SELECT 
      f.id,
      f.user_id,
      f.friend_user_id,
      friend.first_name AS friend_first_name,
      friend.last_name AS friend_last_name,
      f.is_unfriended,
      f.became_friends_at,
      f.updated_at
    FROM friends AS f
      JOIN users AS friend ON f.friend_user_id = friend.id
    WHERE
      user_id = ?;
    `;
    const [rows] = await promisePool.query(queryString, [userId]);
    return rows;
  },
  /**
   * Unfriend a user.
   * @param {string} userId1 - The first user ID
   * @param {string} userId2 - The second user ID
   */
  unFriend: async (userId1, userId2) => {
    let conn = null;
    try {
      conn = await promisePool.getConnection();
      (await conn).beginTransaction();

      const friendsUpdateQuery = `
        UPDATE friends
        SET is_unfriended = 1
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

      await conn.query(friendsUpdateQuery, [
        userId1,
        userId2,
        userId2,
        userId1
      ]);
      await conn.commit();
    } catch (error) {
      if (conn) await conn.rollback();
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
};

module.exports = users;
