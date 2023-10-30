const { promisePool } = require("../db/pool");

const users = {
  /**
   * Find users based on id.
   * @param {string} id The user's id
   * @returns User account found with id
   */
  findById: async (id) => {
    const queryString = `
    SELECT users.id, users.first_name, users.last_name, users.email, users.postal_code, users.city, users.country, users.phone, users.premium, users.password
    FROM users
    WHERE users.id = ?;`;
    const [rows] = await promisePool.query(queryString, [id]);
    return rows[0] === undefined ? null : rows[0];
  },
  /**
   * Find all users.
   * @returns all users
   */
  findAll: async () => {
    const queryString = `SELECT * FROM users`;
    const [rows] = await promisePool.query(queryString);
    return rows === undefined ? null : rows;
  },
  /**
   * Find users based on id and delete it.
   * @param {string} id The user's id
   * @returns User account found with id
   */
  delete: async (id) => {
    console.log("poistettava id", id);
    const deleteQuery = "DELETE FROM users WHERE id=?;";
    await promisePool.query(deleteQuery, [id], (err, result) => {
      if (err) throw err;
      console.log("User deleted");
    });
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
  }
};

module.exports = users;
