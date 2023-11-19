import { useRef, useState } from "react";

import Button from "../../components/button/Button";
import { sendResetPasswordLink } from "../../utils/ResetPwAPI";

import "./RequestPasswordResetForm.css";

const RequestPasswordResetForm = () => {
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const emailRef = useRef("");

  const requestPasswordResetHandler = async (event) => {
    event.preventDefault();
    setError(null);
    const response = await sendResetPasswordLink(emailRef.current.value);
    if (response !== true) {
      setError(response);
    } else {
      setEmailSent(true);
    }
  };

  return (
    <div className="reset-password-container">
      <h2 id="request-password-reset-title">Request password reset</h2>
      {error && (
        <div className="error-container">
          <p data-testid="reset-password-error-message">{error}</p>
        </div>
      )}
      {emailSent ? (
        <div className="email-sent-container">
          <p data-testid="password-reset-email-sent-message">
            &#x2714; Email with link to reset password sent
          </p>
        </div>
      ) : (
        <div className="request-password-reset-form-container">
          <form
            onSubmit={requestPasswordResetHandler}
            className="request-password-reset-form"
          >
            <label htmlFor="email-input">Enter your email</label>
            <input
              id="email-input"
              data-testid="email-input"
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
            <div className="request-password-reset-form_submit-button-container">
              <Button className="submit-password-reset">
                Send password reset email
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestPasswordResetForm;
