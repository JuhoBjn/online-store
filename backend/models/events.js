const { promisePool } = require("../db/pool");

/**
 * Database operations for events.
 * @namespace eventsDB
 */
const eventsDB = {
  /**
   * Creates a new event in the database.
   * @async
   * @param {Object} event - The event object.
   * @param {string} event.name - The name of the event.
   * @param {string} event.description - The description of the event.
   * @param {string} event.starts_at - The start date and time of the event. In ISO 8601 format.
   * @param {string} event.ends_at - The end date and time of the event. In ISO 8601 format.
   * @param {Object} [image] - The image file object.
   * @param {string} image.objectKey - The S3 object key of the image.
   * @param {string} image.originalname - The original name of the image.
   * @param {string} image.mimetype - The MIME type of the image.
   * @param {number} image.size - The size of the image in bytes.
   * @returns {Promise<number>} The ID of the newly created event.
   */
  async createEvent(event, image = null) {
    let conn = null;
    let eventRow = null;
    try {
      conn = await promisePool.getConnection();
      (await conn).beginTransaction();

      let fileRow = null;
      if (image) {
        [fileRow] = await (
          await conn
        ).query(
          "INSERT INTO files (object_key, original_name, mimetype, size) VALUES (?, ?, ?, ?)",
          [image.objectKey, image.originalName, image.mimetype, image.size]
        );
      }

      [eventRow] = await (
        await conn
      ).query(
        "INSERT INTO events (name, description, starts_at, ends_at, picture_id) VALUES (?, ?, ?, ?, ?)",
        [
          event.name,
          event.description,
          event.starts_at,
          event.ends_at,
          fileRow?.insertId // null if no image was uploaded
        ]
      );
      await conn.commit();
    } catch (error) {
      if (conn) await conn.rollback();
      throw error;
    } finally {
      if (conn) conn.release();
    }
    return eventRow.insertId; // return the ID of the newly created event
  },
  /**
   * Get event by ID.
   * @async
   * @param {number} id - The ID of the event to get.
   * @returns {Promise<Object>} The event object.
   **/
  async getEvent(id) {
    const [rows] = await promisePool.query(
      `SELECT 
        e.id,
        e.name,
        e.description,
        e.picture_id,
        e.starts_at,
        e.ends_at,
        e.created_at,
        e.updated_at,
        f.object_key AS image_object_key
      FROM events e
       LEFT JOIN files f ON e.picture_id = f.id
      WHERE e.id = ?;`,
      [id]
    );
    return rows[0];
  },
  /**
   * Deletes an event from the database.
   * @async
   * @param {number} id - The ID of the event to delete.
   * @returns {Promise<void>}
   * @throws Will throw an error if the event does not exist.
   */
  async deleteEvent(id) {
    let conn = null;
    try {
      conn = await promisePool.getConnection();

      await conn.beginTransaction();

      // get file ID of event's image (if any)
      const [fileRow] = await conn.query(
        "SELECT picture_id FROM events WHERE id = ?",
        [id]
      );

      await conn.query("DELETE FROM events WHERE id = ?", [id]);

      await conn.query("DELETE FROM files WHERE id = ?", [
        fileRow[0]?.picture_id
      ]);

      await conn.commit();
    } catch (error) {
      if (conn) await conn.rollback();
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },
  /**
   * Updates an event in the database.
   * @async
   * @param {number} id - The ID of the event to update.
   * @param {Object} eventData - The event object.
   * @param {string} eventData.name - The name of the event.
   * @param {string} eventData.description - The description of the event.
   * @param {string} eventData.starts_at - The start date and time of the event. In ISO 8601 format.
   * @param {string} eventData.ends_at - The end date and time of the event. In ISO 8601 format.
   * @returns {Promise<void>}
   */
  updateEvent: async (id, eventData) => {
    return await promisePool.query("UPDATE events SET ? WHERE id = ?", [
      eventData,
      id
    ]);
  },
  /**
   * Get all events.
   * @async
   * @returns {Promise<Array>} An array of event objects.
   */
  getEvents: async (limit, offset) => {
    const [rows] = await promisePool.query(
      `SELECT 
        e.id,
        e.name,
        e.description,
        e.picture_id,
        e.starts_at,
        e.ends_at,
        e.created_at,
        e.updated_at,
        f.object_key AS image_object_key
      FROM events e
       LEFT JOIN files f ON e.picture_id = f.id
      ORDER BY e.id DESC
      LIMIT ?
      OFFSET ?;`,
      [limit, offset]
    );
    return rows;
  },
  /**
   * Add an attendee to an event.
   * @async
   * @param {number} eventId - The ID of the event.
   * @param {string} userId - The user id of the user.
   * @returns {Promise<void>}
   */
  addAttendee: async (eventId, userId) => {
    return await promisePool.query(
      "INSERT INTO event_attendees (event_id, user_id) VALUES (?, ?)",
      [eventId, userId]
    );
  },
  /**
   * Delete an attendee from an event.
   * @async
   * @param {number} eventId - The ID of the event.
   * @param {string} userId - The user id of the user.
   * @returns {Promise<void>}
   */
  deleteAttendee: async (eventId, userId) => {
    return await promisePool.query(
      "DELETE FROM event_attendees WHERE event_id = ? AND user_id = ?",
      [eventId, userId]
    );
  },
  /**
   * Check if a user is attending an event.
   * @param {number} eventId The ID of the event
   * @param {String} userId ID of the user
   * @returns
   */
  checkAttendee: async (eventId, userId) => {
    const queryString =
      "SELECT * FROM event_attendees WHERE event_id = ? AND user_id = ?;";
    const [rows] = await promisePool.query(queryString, [eventId, userId]);
    return rows.length === 0 ? false : true;
  },
  /**
   * Get all attendees of an event.
   * @async
   * @param {number} eventId - The ID of the event.
   * @returns {Promise<Array>} An array of user objects.
   */
  getEventAttendees: async (eventId) => {
    const [rows] = await promisePool.query(
      `SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email_hash,
        u.created
      FROM event_attendees ea
        LEFT JOIN users u ON ea.user_id = u.id
      WHERE ea.event_id = ?
      ORDER BY u.first_name,
        u.last_name,
        u.id;`,
      [eventId]
    );
    return rows;
  },
  /**
   * Get an attendee of an event.
   * @async
   * @param {number} eventId - The ID of the event.
   * @param {string} userId - The user id of the user.
   * @returns {Promise<Object>} The user object.
   */
  getEventAttendee: async (eventId, userId) => {
    const [rows] = await promisePool.query(
      `SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email_hash,
        u.created
      FROM event_attendees ea
        LEFT JOIN users u ON ea.user_id = u.id
      WHERE ea.event_id = ?
        AND ea.user_id = ?
      ORDER BY u.first_name,
        u.last_name,
        u.id;`,
      [eventId, userId]
    );
    return rows[0];
  },
  /**
   * Get all events that a user is attending.
   * @async
   * @param {string} userId - The user id of the user.
   * @returns {Promise<Array>} An array of event objects.
   */
  findEventsByUserId: async (userId) => {
    const [rows] = await promisePool.query(
      `SELECT 
        e.id,
        e.name,
        e.description,
        e.picture_id,
        e.starts_at,
        e.ends_at,
        e.created_at,
        e.updated_at,
        f.object_key AS image_object_key
      FROM event_attendees ea
       LEFT JOIN events e ON ea.event_id = e.id
       LEFT JOIN files f ON e.picture_id = f.id
      WHERE ea.user_id = ?
      ORDER BY e.id DESC;`,
      [userId]
    );
    return rows;
  }
};

module.exports = eventsDB;
