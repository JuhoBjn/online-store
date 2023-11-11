import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";
import { setNewPassword } from "../../utils/ResetPwAPI";
import { parseTokenExpiration } from "../../utils/parseTokenExpiration";

import "./SetNewPasswordForm.css";

const SetNewPasswordForm = ({ resetToken }) => {
  const [error, setError] = useState(null);
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const setNewPasswordHandler = async (event) => {
    event.preventDefault();
    const response = await setNewPassword(
      resetToken,
      passwordRef.current.value
    );
    if (response !== true) {
      setError(response);
    } else {
      navigate("/auth");
    }
  };

  const requestNewPasswordTokenHandler = () => {
    navigate("/reset-password");
    location.reload();
  };

  const tokenExpiration = parseTokenExpiration(resetToken);
  const tokenExpired = Date.now() >= tokenExpiration * 1000;

  return (
    <div className="set-new-password-container">
      {tokenExpired ? (
        <div className="token-expired-container">
          <p data-testid="token-expiry-message">
            The token to reset your password has expired. Please request a new
            one.
          </p>
          <div className="request-new-password-reset-token-button-container">
            <Button onClick={requestNewPasswordTokenHandler}>
              Request new token to reset password
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h2 id="set-new-password-title">Set a new password</h2>
          {error && (
            <div className="set-new-password-error-container">
              <p data-testid="set-new-password-error-message">
                Failed to set new password. Please try again.
              </p>
            </div>
          )}
          <form
            className="set-new-password-form-container"
            onSubmit={setNewPasswordHandler}
          >
            <label htmlFor="password-input">Enter your new password</label>
            <input
              id="password-input"
              data-testid="password-input"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              minLength={8}
              maxLength={72}
              required
            />
            <div
              className="auth-page_password-instructions set-new-password-instructions"
              data-testid="password-instructions"
            >
              <p>Password must have:</p>
              <ul>
                <li>At least eight characters</li>
                <li>Include at least one capital letter</li>
                <li>Include at least one lowercase letter</li>
                <li>Include at least one number</li>
              </ul>
            </div>
            <div className="submit-new-password-form-button-container">
              <Button>Set new password</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default SetNewPasswordForm;
