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

export { createNewArticle };
