const { promisePool } = require("../db/pool");

/**
 * Database operations for news.
 * @module models/news
 */
const newsDB = {
  /**
   * Creates a new news article in the database.
   * @async
   * @param {Object} news - The news object.
   * @param {string} news.headline - The headline of the news.
   * @param {string} news.body - The body of the news.
   * @param {string} news.link - Where the news post links to.
   * @param {Object} [image] - The image file object.
   * @param {string} image.objectKey - The S3 object key of the image.
   * @param {string} image.originalname - The original name of the image.
   * @param {string} image.mimetype - The MIME type of the image.
   * @param {number} image.size - The size of the image in bytes.
   * @returns {Promise<number>} The ID of the newly created news.
   */
  async createNewsArticle(news, image = null) {
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
        "INSERT INTO news (headline, body, link, picture_id) VALUES (?, ?, ?, ?)",
        [
          news.headline,
          news.body,
          news.link,
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
    return eventRow.insertId; // return the ID of the newly created news
  },
  /**
   * Get news by ID.
   * @async
   * @param {number} id - The ID of the news to get.
   * @returns {Promise<Object>} The news object.
   **/
  async getNewsArticle(id) {
    const [rows] = await promisePool.query(
      `SELECT 
        n.id,
        n.headline,
        n.body,
        n.picture_id,
        n.link,
        n.created_at,
        n.updated_at,
        f.object_key AS image_object_key
      FROM news n
       LEFT JOIN files f ON n.picture_id = f.id
      WHERE n.id = ?;`,
      [id]
    );
    return rows[0];
  },
  /**
   * Deletes a news article from the database.
   * @async
   * @param {number} id - The ID of the news to delete.
   * @returns {Promise<void>}
   * @throws Will throw an error if the news does not exist.
   */
  async deleteNewsArticle(id) {
    let conn = null;
    try {
      conn = await promisePool.getConnection();

      await conn.beginTransaction();

      // get file ID of news's image (if any)
      const [fileRow] = await conn.query(
        "SELECT picture_id FROM news WHERE id = ?",
        [id]
      );

      await conn.query("DELETE FROM news WHERE id = ?", [id]);

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
   * Updates an news in the database.
   * @async
   * @param {number} id - The ID of the news to update.
   * @param {Object} eventData - The news object.
   * @param {string} eventData.name - The name of the news.
   * @param {string} eventData.description - The description of the news.
   * @param {string} eventData.starts_at - The start date and time of the news. In ISO 8601 format.
   * @param {string} eventData.ends_at - The end date and time of the news. In ISO 8601 format.
   * @returns {Promise<void>}
   */
  updateNews: async (id, eventData) => {
    return await promisePool.query("UPDATE news SET ? WHERE id = ?", [
      eventData,
      id
    ]);
  },
  /**
   * Get all news.
   * @async
   * @returns {Promise<Array>} An array of news objects.
   */
  getNewsArticles: async (limit, offset) => {
    const [rows] = await promisePool.query(
      `SELECT 
        n.id,
        n.headline,
        n.body,
        n.picture_id,
        n.link,
        n.created_at,
        n.updated_at,
        f.object_key AS image_object_key
      FROM news n
       LEFT JOIN files f ON n.picture_id = f.id
      ORDER BY n.id DESC
      LIMIT ?
      OFFSET ?;`,
      [limit, offset]
    );
    return rows;
  }
};

module.exports = newsDB;
