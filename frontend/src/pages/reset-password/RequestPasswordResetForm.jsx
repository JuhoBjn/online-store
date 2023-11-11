import { useRef } from "react";

import Button from "../../components/button/Button";

import "./RequestPasswordResetForm.css";

const RequestPasswordResetForm = () => {
  const emailRef = useRef("");

  const requestPasswordResetHandler = (event) => {
    event.preventDefault();
    console.log("Request password reset");
  };

  return (
    <div className="reset-password-container">
      <h2 id="request-password-reset-title">Request password reset</h2>
      <div className="request-password-reset-form-container">
        <form
          onSubmit={requestPasswordResetHandler}
          className="request-password-reset-form"
        >
          <label htmlFor="email-input">Enter your email</label>
          <input
            id="email-input"
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
    </div>
  );
};

export default RequestPasswordResetForm;
