import { useState, useRef, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import ProfileCard from "./ProfileCard";
import { AuthContext } from "../../utils/AuthContext";
import LikeImage from "../../assets/Smash_that_like.png";
import TrashBinImage from "../../assets/Trash_bin.png";

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
          <div className="pass-button-container" onClick={nextHandler}>
            <h2>PASS</h2>
            <img
              id="pass-button-image"
              data-testid="pass-button-image"
              src={TrashBinImage}
              alt="Pass - image"
            />
          </div>
          <div className="match-page_profile-card-container">
            <ProfileCard user={displayedUser} />
          </div>
          <div
            className="smash-button-container"
            onClick={friendRequestHandler}
          >
            <h2>SMASH</h2>
            <img
              id="smash-button-image"
              data-testid="smash-button-image"
              src={LikeImage}
              alt="Smash that like - button"
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
