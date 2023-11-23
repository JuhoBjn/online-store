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

export { sendFriendRequest };
