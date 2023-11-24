import { useState, useRef, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import ProfileCard from "./ProfileCard";
import { AuthContext } from "../../utils/AuthContext";
import LikeImage from "../../assets/Smash_that_like.png";
import TrashBinImage from "../../assets/Trash_bin.png";

import "./Match.css";

const Match = () => {
  const [matchUsers, setMatchUsers] = useState(useLoaderData());
  const [displayedUser, setDisplayedUser] = useState(matchUsers.at(0));
  const displayedUserIndex = useRef(0);
  const authContext = useContext(AuthContext);

  const nextHandler = () => {
    if (displayedUserIndex.current === matchUsers.length - 1) {
      displayedUserIndex.current = 0;
    } else {
      displayedUserIndex.current++;
    }
    setDisplayedUser(matchUsers.at(displayedUserIndex.current));
  };

  const friendRequestHandler = async () => {
    console.log("Friend request handler");
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

    if (response.status === 200) {
      setMatchUsers((prev) => prev.splice(displayedUserIndex.current, 1));
      if (displayedUserIndex.current >= matchUsers.length) {
        displayedUserIndex.current = 0;
      }
      setDisplayedUser(displayedUserIndex.current);
    } else {
      const responseBody = response.json();
      console.error(responseBody.message);
    }
  };

  return (
    <div className="match-page">
      {matchUsers.length > 1 ? (
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
        <h2>No users found</h2>
      )}
    </div>
  );
};

export default Match;
