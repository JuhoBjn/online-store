import "./ContextMenu.css";

const ContextMenu = ({ navigateToProfileHandler, logoutHandler }) => {
  return (
    <div className="context-menu-container">
      <ul id="context-menu-links">
        <li id="context-menu-profile-link">
          <div
            className="context-menu-link-container"
            onClick={navigateToProfileHandler}
          >
            <p>Go to profile</p>
          </div>
        </li>
        <li>
          <div className="context-menu-link-container" onClick={logoutHandler}>
            <p>Log out</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
