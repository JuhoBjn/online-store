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

export { fetchAllNews };
