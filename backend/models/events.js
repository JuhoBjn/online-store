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
  updateEvent: async (id, eventData) => {
    return await promisePool.query("UPDATE events SET ? WHERE id = ?", [
      eventData,
      id
    ]);
  }
};

module.exports = eventsDB;
