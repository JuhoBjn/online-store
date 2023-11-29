import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import "./FriendRequestListItem.css";

const FriendRequestListItem = ({
  id,
  requesterUserId,
  emailHash,
  firstname,
  lastname,
  acceptFriendRequest,
  denyFriendRequest
}) => {
  return (
    <div className="friend-request-list-item">
      <div className="friend-request-list-item-profile-pic-container">
        <img
          data-testid="friend-request-list-item-profile-picture"
          src={`https://www.gravatar.com/avatar/${emailHash}?d=mp`}
          alt={`${firstname} ${lastname}&apos;s profile picture`}
        />
      </div>
      <div className="friend-request-list-item-user-name">
        <Link
          data-testid="friend-request-list-item-username"
          to={`/user/${requesterUserId}`}
        >
          {firstname} {lastname}
        </Link>
      </div>
      <div className="friend-request-list-item-actions-container">
        <div
          className="friend-request-list-item-accept-friend-request"
          data-testid="accept-friend-request"
          onClick={() => acceptFriendRequest(id)}
        >
          <CheckCircleIcon id="accept-friend-request-icon" fontSize="large" />
        </div>
        <div
          className="friend-request-list-item-deny-friend-request"
          data-testid="deny-friend-request"
          onClick={() => denyFriendRequest(id)}
        >
          <CancelIcon id="deny-friend-request-icon" fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default FriendRequestListItem;
