const { promisePool } = require("../db/pool");

const users = {
  /**
   * Find users based on email.
   * @param {*} email
   * @returns List of user ids
   */
  findByEmail: async (email) => {
    const queryString = "SELECT id FROM users WHERE email = ?;";
    const [rows] = await promisePool.query(queryString, [email]);
    return rows;
  },
  /**
   * Create a new user entry.
   * @param {*} user
   * @returns Created user
   */
  create: async (user) => {
    const insertString =
      "INSERT INTO users(id,email,password,role_id) SELECT ?,?,?,id FROM roles WHERE name='user';";
    await promisePool.query(insertString, [user.id, user.email, user.password]);

    const fetchString = "SELECT id,email FROM users WHERE id = ?;";
    const createdUser = await promisePool.query(fetchString, [user.id]);
    return createdUser[0];
  }
};

module.exports = users;
