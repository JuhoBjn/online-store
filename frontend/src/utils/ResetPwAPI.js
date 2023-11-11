/**
 * Request a link to reset password.
 * @param {string} email The email address to send the reset password link to.
 * @returns {boolean | string} True when email was sent, otherwise error message.
 */
const sendResetPasswordLink = async (email) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/password-reset/send-reset-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      }
    );
    if (response.status === 200) {
      return true;
    }
    const responseObject = await response.json();
    return await responseObject.error;
  } catch (error) {
    if (error && error.message) {
      console.log(error.message);
    }
  }
};

/**
 * Set a new password.
 * @param {string} token JWT for authenticating the user.
 * @param {string} password User's new password.
 * @returns {boolean | string} True if password reset is successful, otherwise error message;
 */
const setNewPassword = async (token, password) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/password-reset/set-new-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
      }
    );
    if (response.status === 204) {
      return true;
    }
    const responseObject = await response.json();
    return responseObject.error;
  } catch (error) {
    if (error && error.message) {
      console.log(error.message);
    }
  }
};

export { sendResetPasswordLink, setNewPassword };
