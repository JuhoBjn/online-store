import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GoldenageLogo from "../../assets/Goldenage_logo.png";
import Button from "../../components/button/Button";
import { AuthContext } from "../../utils/AuthContext";

import "./Authorization.css";

const Authorization = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const toggleLoginMode = () => {
    setShowErrorMessage(false);
    setErrorMessage("");
    setLoginMode(!loginMode);
  };

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    if (showErrorMessage) {
      setShowErrorMessage(false);
      setErrorMessage("");
    }

    try {
      await authContext.login(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log("Login successful");
      navigate("/");
    } catch (error) {
      setShowErrorMessage(true);
      setErrorMessage(
        "Login failed. Please check email and re-enter password and try again."
      );
      console.log(error.message);
    }
  };

  const signupHandler = async (event) => {
    event.preventDefault();

    try {
      await authContext.signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/edit-profile");
    } catch (error) {
      setShowErrorMessage(true);
      if (error.message.includes("password")) {
        setErrorMessage(
          "Signup failed. Password must be eight characters long, have at least one capital letter, one lower case letter and a number"
        );
      } else {
        setErrorMessage(error.message);
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Navigate to the home page if the user is already logged in.
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.token) {
      navigate("/");
    }
  }, [navigate]);

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
          {showErrorMessage && (
            <div
              className="auth-form_error-container"
              data-testid="error-container"
            >
              <p>{errorMessage}</p>
            </div>
          )}
          <form
            data-testid="login-form"
            className="auth-page_login-form"
            onSubmit={loginMode ? loginHandler : signupHandler}
          >
            <label htmlFor="email">Enter email</label>
            <input
              id="email"
              className="auth-page_input"
              data-testid="email-input"
              type="email"
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
              data-testid="toggle-login-mode"
              className="center"
              type={"action"}
              onClick={toggleLoginMode}
            >
              {loginMode ? "Sign up" : "Log in"} instead
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
