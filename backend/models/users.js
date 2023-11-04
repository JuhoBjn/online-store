const { promisePool } = require("../db/pool");

const users = {
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
   * @param {string} userId - The user ID
   * @param {Object} userData - object containing key value pairs to update
   * @example await update("123-456-789", {"first_name": "Mike", "last_name": "Smith"})
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
  }
};
module.exports = users;
