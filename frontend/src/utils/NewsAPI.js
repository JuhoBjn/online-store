/**
 * Fetch all news stories.
 * @param {String} token JWT token
 * @returns {Array<Object> | false} Array of articles if successful, otherwise false.
 */
const fetchAllNews = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/news`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    );
    const responseMessage = await response.json();
    if (response.status !== 200) {
      throw new Error(`Failed to fetch news: ${responseMessage.message}`);
    }
    return responseMessage;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

/**
 * Fetch an individual news article base on ID.
 * @param {number} id ID of the article
 * @param {String} token JWT token
 * @returns {Object | false} Article object if successful, otherwise false.
 */
const fetchArticle = async (id, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/news/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    );
    const responseMessage = await response.json();
    if (response.status !== 200) {
      throw new Error(`Failed to fetch article: ${responseMessage.message}`);
    }
    const formattedArticle = {
      id: responseMessage.id,
      headline: responseMessage.headline,
      body: responseMessage.body,
      pictureId: responseMessage.picture_id,
      link: responseMessage.link,
      createdAt: responseMessage.created_at,
      updatedAt: responseMessage.updated_at,
      imageObjectKey: responseMessage.image_object_key,
      imageUrl: responseMessage.image_url
    };
    return formattedArticle;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { fetchAllNews, fetchArticle };
