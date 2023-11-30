import "./DropdownMenu.css";

const DropdownMenu = ({
  userRole,
  navigateToProfileHandler,
  navigateToFriendsHandler,
  navigateToCaretakerPageHandler,
  logoutHandler
}) => {
  console.log(userRole === "caretaker");
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
        {(userRole === "caretaker" ||
          userRole === "admin") && (
            <li>
              <div
                data-testid="go-to-caretaker-page"
                className="dropdown-menu-link-container"
                onClick={navigateToCaretakerPageHandler}
              >
                <p>Caretaker</p>
              </div>
            </li>
          )}
        <li>
          <div
            data-testid="go-to-friends"
            className="dropdown-menu-link-container"
            onClick={navigateToFriendsHandler}
          >
            <p>Friends</p>
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
