import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import GoldenageLogo from "../../assets/Goldenage_logo.png";
import { AuthContext } from "../../utils/AuthContext";
import DropdownMenu from "./DropdownMenu";

import "./LoggedInNavBar.css";
import TransparentOverlay from "../transparent-overlay/TransparentOverlay";

const LoggedInNavBar = () => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  const navigateToProfileHandler = () => {
    console.log("Navigate to profile", authContext.id);
    navigate(`/user/${authContext.id}`);
  };

  const logoutHandler = () => {
    console.log("Logout");
    authContext.logout();
  };

  return (
    <nav className="logged-in-navbar">
      <div className="logged-in-nav-logo-container">
        <img
          id="goldenage-logo"
          data-testid="goldenage-logo"
          src={GoldenageLogo}
          alt="Goldenage logo: Circle with a house-shaped cutout. Golden letter G inside the cutout. Goldenage written above the circle."
        />
      </div>
      <div className="logged-in-nav-links">
        <ul>
          <li>
            <NavLink data-testid="news-page-link" to="/">
              News
            </NavLink>
          </li>
          <li>
            <NavLink data-testid="activities-page-link" to="/activities">
              Activities
            </NavLink>
          </li>
          <li>
            <NavLink data-testid="match-page-link" to="/match">
              Match
            </NavLink>
          </li>
          <li>
            <NavLink data-testid="messages-page-link" to="/messages">
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink data-testid="help-page-link" to="/help">
              Help
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        className="nav-profile-picture-container"
        onClick={toggleDropdownMenu}
      >
        <img
          id="profile-picture"
          data-testid="profile-picture"
          src={`https://gravatar.com/avatar/${authContext.email_hash}?d=mp`}
        />
        {showDropdownMenu && (
          <>
            <TransparentOverlay onClick={toggleDropdownMenu} />
            <DropdownMenu
              navigateToProfileHandler={navigateToProfileHandler}
              logoutHandler={logoutHandler}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default LoggedInNavBar;
