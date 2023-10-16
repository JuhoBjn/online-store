import { useRef, useState } from "react";

import GoldenageLogo from "../../assets/Goldenage_logo.png";
import Button from "../../components/button/Button";

import "./Authorization.css";

const Authorization = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [loginFailed, setLoginFailed] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const toggleLoginMode = () => {
    if (loginMode) setLoginFailed(false);
    setLoginMode(!loginMode);
  };

  const login = (event) => {
    event.preventDefault();
  };

  const signup = (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth-page center" data-testid="auth-page_background">
      <div className="auth-page_login-container">
        <div className="auth-page_logo-container">
          <img
            className="auth-page_logo"
            data-testid="logo"
            src={GoldenageLogo}
            alt="Goldenage logo: Circle with a house-shaped cutout. Golden letter G inside the cutout. Goldenage written above the circle."
          />
        </div>
        <div className="auth-page_login-form-container">
          <h1 id="auth-page_login-form-title">
            {loginMode ? "Log in" : "Sign up"}
          </h1>
          {loginFailed && (
            <div className="auth-form_error-container">
              <p>
                Invalid credentials. Please check check email and re-enter
                password and try again.
              </p>
            </div>
          )}
          <form
            className="auth-page_login-form"
            onSubmit={loginMode ? login : signup}
          >
            <label htmlFor="email">Enter email</label>
            <input
              id="email"
              className="auth-page_input"
              data-testid="email-input"
              type="text"
              placeholder="email"
              ref={emailRef}
              required
            />
            <label htmlFor="password">Enter password</label>
            <input
              id="password"
              className="auth-page_input"
              data-testid="password-input"
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <button
              className="auth-page_submit-button"
              data-testid="submit-button"
              type="submit"
            >
              {loginMode ? "Log in" : "Sign up"}
            </button>
          </form>
          <div className="auth-page_login-form-footer">
            <Button
              className="center"
              type={"action"}
              onClick={toggleLoginMode}
            >
              Switch login/signup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
