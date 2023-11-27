import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import FriendListItem from "../../components/friend-list-item/FriendListItem";

import "./Friends.css";

const Friends = () => {
  const [friends] = useState(useLoaderData());

  return (
    <div className="friends-tab">
      <ul data-testid="friends-list" className="friends-list">
        {friends.map((friend) => (
          <li key={friend.id}>
            <FriendListItem
              id={friend.friend_user_id}
              emailHash={friend.friend_email_hash}
              firstname={friend.friend_first_name}
              lastname={friend.friend_last_name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
