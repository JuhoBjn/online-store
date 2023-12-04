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

/**
 * Create a new article without an image.
 * @param {FormData} article The article to create.
 * @param {String} token JWT token
 * @returns {Number | false} ID of created article if successful, otherwise false
 */
const createNewArticle = async (article, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/news`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: article
      }
    );
    const responseMessage = await response.json();
    if (response.status !== 200) {
      throw new Error(`Failed to post article: ${responseMessage.message}`);
    }
    return responseMessage.id;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Update a news article.
 * @param {number} articleId ID of the article to update
 * @param {Object} article The article content to update
 * @param {String} [headline] Headline of the article
 * @param {String} [body] Text body of the article
 * @param {String} [link] Link associated with the article
 * @param {String} token JWT token
 * @returns {Boolean} True if successful, otherwise false.
 */
const updateArticle = async (articleId, article, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/news/${articleId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(article)
      }
    );
    if (response.status !== 204) {
      const message = response.json();
      throw new Error(`Failed to update article: ${message}`);
    }
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const deleteArticle = async (articleId, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/news/${articleId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status !== 204) {
      const message = response.json();
      throw new Error(`Failed to delete article: ${message.error}`);
    }
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export {
  fetchAllNews,
  fetchArticle,
  createNewArticle,
  updateArticle,
  deleteArticle
};
