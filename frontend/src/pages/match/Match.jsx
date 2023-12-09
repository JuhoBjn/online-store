import { useState, useRef, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import ProfileCard from "./ProfileCard";
import { AuthContext } from "../../utils/AuthContext";
import CheckMark from "../../assets/check.svg";
import CrossMark from "../../assets/cross.svg";

import "./Match.css";

const Match = () => {
  const matchUsers = useRef(useLoaderData());
  const [displayedUser, setDisplayedUser] = useState(matchUsers.current.at(0));
  const authContext = useContext(AuthContext);

  const nextHandler = () => {
    if (matchUsers.current.at(0).id === displayedUser.id) {
      matchUsers.current.shift();
    }
    setDisplayedUser(matchUsers.current.shift());
  };

  const friendRequestHandler = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/users/${
        authContext.id
      }/friend-requests/${displayedUser.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authContext.token}`
        }
      }
    );

    if (response.status !== 200) {
      const responseBody = response.json();
      console.error(responseBody.message);
    }
    nextHandler();
  };

  return (
    <div className="match-page">
      {matchUsers.current.length > 0 ? (
        <div className="match-container">
          <div
            data-testid="pass-button-container"
            className="pass-button-container"
            onClick={nextHandler}
          >
            <img
              id="pass-button-icon"
              data-testid="pass-button-icon"
              src={CrossMark}
              alt="Pass button. Skip to the next user."
            />
          </div>
          <div
            data-testid="match-page_profile-card-container"
            className="match-page_profile-card-container"
          >
            <ProfileCard user={displayedUser} />
          </div>
          <div
            data-testid="accept-button-container"
            className="accept-button-container"
            onClick={friendRequestHandler}
          >
            <img
              id="accept-button-icon"
              data-testid="accept-button-icon"
              src={CheckMark}
              alt="Accept button. Sends friend request."
            />
          </div>
        </div>
      ) : (
        <div className="match-page_no-users-found-container">
          <h2>No users found</h2>
        </div>
      )}
    </div>
  );
};

export default Match;
