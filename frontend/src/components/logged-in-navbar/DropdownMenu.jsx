import "./DropdownMenu.css";

const DropdownMenu = ({ navigateToProfileHandler, logoutHandler }) => {
  return (
    <div className="dropdown-menu-container">
      <ul id="dropdown-menu-links">
        <li id="dropdown-menu-profile-link">
          <div
            data-testid="go-to-profile"
            className="dropdown-menu-link-container"
            onClick={navigateToProfileHandler}
          >
            <p>Go to profile</p>
          </div>
        </li>
        <li>
          <div
            data-testid="log-out"
            className="dropdown-menu-link-container"
            onClick={logoutHandler}
          >
            <p>Log out</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
