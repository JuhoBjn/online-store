import { NavLink, useNavigate } from "react-router-dom";

import GoldenageLogo from "../../assets/Goldenage_logo.png";
import Button from "../button/Button";

import "./LoggedOutNavBar.css";

const LoggedOutNavBar = () => {
  const navigate = useNavigate();

  const navigateAuthHandler = () => {
    navigate("/auth");
  };

  return (
    <nav className="navigation-bar-container">
      <div className="navigation-left">
        <img
          data-testid="goldenage-logo"
          src={GoldenageLogo}
          alt="The Goldenage logo: Circle with a house-shaped cutout. Golden letter G inside the cutout. Goldenage written above the circle."
        />
      </div>
      <div className="logged-out-navigation-links">
        <ul>
          <li>
            <NavLink data-testid="navigate-home-link" to="/frontpage">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink data-testid="navigate-about-us-link" to="/about-us">
              About us
            </NavLink>
          </li>
          <li>
            <NavLink data-testid="navigate-contact-us-link" to="/contact-us">
              Contact us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="logged-out-navigation-button-container">
        <Button type="confirm" onClick={navigateAuthHandler}>
          Log in / Sign up
        </Button>
      </div>
    </nav>
  );
};

export default LoggedOutNavBar;
