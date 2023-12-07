/**
 * Fetch all posted events.
 * @param {String} token JWT token
 * @returns {Array<Object> | false} List of events if successful, otherwise false
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

/**
 *
 * @param {String} activityId ID of the activity to fetch
 * @param {String} token JWT token
 * @returns {Object | false} Activity object if successful, otherwise false.
 */
const fetchSingleActivity = async (activityId, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/events/${activityId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    const responseMessage = await response.json();
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch activity details: ${responseMessage.error}`
      );
    }
    return responseMessage;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

/**
 * Add a user as an attendee for an activity.
 * @param {Number} activityId ID of the activity
 * @param {String} userId ID of the user
 * @param {String} token JWT token
 * @returns
 */
const signupForActivity = async (activityId, userId, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/events/${activityId}/attendees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: userId })
      }
    );
    if (response.status !== 204) {
      const responseMessage = response.json();
      throw new Error(`Failed to sign up for event: ${responseMessage.error}`);
    }
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

/**
 * Create a new activity.
 * @param {FormData} activity The activity to create
 * @param {String} token JWT token
 * @returns {number | false} ID of the created activity if successful, otherwise false.
 */
const createActivity = async (activity, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: activity
      }
    );
    const responseMessage = await response.json();
    if (response.status !== 200) {
      throw new Error(`Failed to create activity: ${responseMessage.error}`);
    }
    return responseMessage.id;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export {
  fetchAllActivities,
  fetchSingleActivity,
  signupForActivity,
  createActivity
};
