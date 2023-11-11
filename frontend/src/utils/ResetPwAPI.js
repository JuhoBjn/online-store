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

export { sendResetPasswordLink };
