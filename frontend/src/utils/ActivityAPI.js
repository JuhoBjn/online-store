/**
 * Fetch all posted events.
 * @param {String} token JWT token
 * @returns {Array<Object> | false} List of events if successful, otherwise false.
 */
const fetchAllActivities = async (token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/events`,
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
      throw new Error(`Failed to fetch activities: ${responseMessage.message}`);
    }
    return responseMessage;
  } catch (error) {
    console.error(error.error);
    return false;
  }
};

export { fetchAllActivities };
