import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./FriendsPage.css";

const FriendsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/friends/all", { replace: true });
  }, [navigate]);

  return (
    <div className="friends-page">
      <div
        data-testid="friends-page-content-container"
        className="friends-page-content-container"
      >
        <div className="friends-page-content-top-bar">
          <NavLink
            data-testid="friends-tab-link"
            className="friends-page-content-top-bar-link"
            to="/friends/all"
          >
            Friends
          </NavLink>
          <NavLink
            data-testid="friend-requests-tab-link"
            className="friends-page-content-top-bar-link"
            to="/friends/friend-requests"
          >
            Friend requests
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default FriendsPage;
