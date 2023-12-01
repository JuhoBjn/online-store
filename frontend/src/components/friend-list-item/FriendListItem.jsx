import { Link } from "react-router-dom";

import "./FriendListItem.css";

const FriendListItem = ({
  id,
  emailHash,
  firstname,
  lastname,
  linkDisabled
}) => {
  return (
    <div className="friend-list-item">
      <div className="friend-list-item-profile-pic-container">
        <img
          data-testid="friend-list-item-profile-picture"
          src={`https://www.gravatar.com/avatar/${emailHash}?d=mp`}
          alt={`${firstname} ${lastname}'s profile picture`}
        />
      </div>
      <div className="friend-list-item-content">
        {linkDisabled ? (
          <p data-testid="friend-list-item-username">
            {firstname} {lastname}
          </p>
        ) : (
          <Link data-testid="friend-list-item-username" to={`/user/${id}`}>
            {firstname} {lastname}
          </Link>
        )}
      </div>
    </div>
  );
};

export default FriendListItem;
