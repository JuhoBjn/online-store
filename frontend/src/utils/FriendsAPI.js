/**
 * Get all friends of a user.
 * @param {String} userId ID of the logged in user.
 * @param {String} token JWT token
 * @returns {Array<Object> | Boolean} Array of friends on success, otherwise false;
 */
const getFriends = async (userId, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/users/${userId}/friends`,
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
      throw new Error(responseMessage.message);
    }
    return responseMessage;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

/**
 * Send a friend request to another user.
 * @param {String} userId ID of the sending user
 * @param {String} recipientId ID of the recipient user
 * @param {String} token JWT token
 * @returns Response message if successful, false if not successful.
 */
const sendFriendRequest = async (userId, recipientId, token) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_API
    }/api/users/${userId}/friend-requests/${recipientId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }
  );
  const responseMessage = await response.json();
  if (response.status !== 200) {
    console.error(`Failed to send friend request: ${responseMessage.message}`);
    return false;
  }
  return responseMessage;
};

/**
 * Get all received friend requests.
 * @param {String} userId ID of the logged in user
 * @param {String} token JWT token
 * @returns {Array<Object>} Array of friend requests on success, otherwise false.
 */
const getReceivedFriendRequests = async (userId, token) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_API
      }/api/users/${userId}/friend-requests/received`,
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
      throw new Error(responseMessage.message);
    }
    return responseMessage;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

/**
 * Accept a friend request.
 * @param {String} userId ID of the logged in user
 * @param {Integer} requestId ID of the friend request
 * @param {String} token JWT token
 * @returns {Boolean} True if successful, otherwise false.
 */
const acceptFriendRequest = async (userId, requestId, token) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_API
      }/api/users/${userId}/friend-requests/${requestId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "accepted" })
      }
    );
    const responseMessage = await response.json();
    if (response.status !== 201) {
      throw new Error(responseMessage.message);
    }
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

/**
 * Deny a friend request.
 * @param {String} userId ID of the logged in user
 * @param {Integer} requestId ID of the friend request
 * @param {String} token JWT token
 * @returns {Boolean} True if successful, otherwise false.
 */
const denyFriendRequest = async (userId, requestId, token) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_API
      }/api/users/${userId}/friend-requests/${requestId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "denied" })
      }
    );
    const responseMessage = await response.json();
    if (response.status !== 200) {
      throw new Error(responseMessage.message);
    }
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export {
  getFriends,
  sendFriendRequest,
  getReceivedFriendRequests,
  acceptFriendRequest,
  denyFriendRequest
};
