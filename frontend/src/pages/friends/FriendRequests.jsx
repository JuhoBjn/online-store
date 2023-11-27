import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import FriendRequestListItem from "../../components/friend-request-list-item/FriendRequestListItem";
import { acceptFriendRequest, denyFriendRequest } from "../../utils/FriendsAPI";
import { AuthContext } from "../../utils/AuthContext";

import "./FriendRequests.css";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState(useLoaderData());
  const authContext = useContext(AuthContext);

  const acceptFriendRequestHandler = async (requestId) => {
    const isSuccessful = await acceptFriendRequest(
      authContext.id,
      requestId,
      authContext.token
    );

    if (isSuccessful) {
      setFriendRequests((prev) => prev.filter((fr) => fr.id !== requestId));
    } else {
      window.alert("Failed to accept friend request. Please try again.");
    }
  };

  const denyFriendRequestHandler = async (requestId) => {
    const isSuccessful = await denyFriendRequest(
      authContext.id,
      requestId,
      authContext.token
    );

    if (isSuccessful) {
      setFriendRequests((prev) => prev.filter((fr) => fr.id !== requestId));
    } else {
      window.alert("Failed to deny friend request. Please try again.");
    }
  };

  return (
    <div className="friend-requests-tab">
      <ul data-testid="friend-requests-list" className="friend-requests-list">
        {friendRequests.map((friendRequest) => (
          <li key={friendRequest.id}>
            <FriendRequestListItem
              id={friendRequest.id}
              requesterUserId={friendRequest.requester_user_id}
              firstname={friendRequest.requester_first_name}
              lastname={friendRequest.requester_last_name}
              acceptFriendRequest={acceptFriendRequestHandler}
              denyFriendRequest={denyFriendRequestHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
