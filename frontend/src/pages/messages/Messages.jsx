import { useLoaderData } from "react-router-dom";
import FriendListItem from "../../components/friend-list-item/FriendListItem";
import "./Messages.css";
import { useState } from "react";
import Chat from "../../components/chat/Chat";

const Messages = () => {
  const allFriendsData = useLoaderData();
  const [selectedFriendData, setSelectedFriendData] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleFriendClick = (friendId) => {
    setSelectedFriendData(
      allFriendsData.find(
        (friendData) => friendData.friend_user_id === friendId
      )
    );
  };

  return (
    <div className="messages-page">
      <h1>Messages page</h1>
      <div className="messages-page__friends-list-container">
        {allFriendsData.map((friendData) => (
          <div
            className={`messages-page__friend-list-item-container ${
              friendData.friend_user_id === selectedFriendData?.friend_user_id
                ? "selected"
                : ""
            }`}
            key={friendData.friend_user_id}
            onClick={() => handleFriendClick(friendData.friend_user_id)}
          >
            <FriendListItem
              id={friendData.friend_user_id}
              emailHash={friendData.friend_email_hash}
              firstname={friendData.friend_first_name}
              lastname={friendData.friend_last_name}
              linkDisabled={true}
            />
          </div>
        ))}
      </div>
      <div className="messages-page__chat-container">
        {selectedFriendData ? (
          <Chat
            user={storedUser}
            friend={{
              id: selectedFriendData?.friend_user_id,
              firstname: selectedFriendData?.friend_first_name,
              lastname: selectedFriendData?.friend_last_name
            }}
            isDisabled={selectedFriendData?.is_unfriended}
            disabledMessage={
              selectedFriendData?.is_unfriended
                ? "You cannot chat as you are no longer friends with this user"
                : ""
            }
          />
        ) : (
          <div>
            <p>Select a friend to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
