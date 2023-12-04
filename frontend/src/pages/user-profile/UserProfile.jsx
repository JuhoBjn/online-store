import { useState, useContext } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

import { AuthContext } from "../../utils/AuthContext";
import { sendFriendRequest, unfriendUser } from "../../utils/FriendsAPI";
import { upgradeToPremium } from "../../utils/UsersAPI";

import Button from "../../components/button/Button";
import PremiumBadge from "../../components/premium-badge/PremiumBadge";

import "./UserProfile.css";

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(useLoaderData());
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  const sendFriendRequestHandler = async () => {
    const response = await sendFriendRequest(
      authContext.id,
      user.id,
      authContext.token
    );
    if (response) {
      setFriendRequestSent(true);
    }
  };

  const editProfileHandler = () => {
    navigate(`/user/${authContext.id}/edit`);
  };

  const upgradeToPremiumHandler = async () => {
    const response = await upgradeToPremium(authContext.id, authContext.token);
    if (response) {
      setUser((prev) => {
        return { ...prev, premium: true };
      });
    } else {
      console.log("Failed to upgrade to premium");
    }
  };

  const unfriendUserHandler = async () => {
    const confirmMessage = `Are you sure you want to unfriend ${user.firstname} ${user.lastname}? You can send a new friend request to become friends again.`;
    if (confirm(confirmMessage)) {
      const success = await unfriendUser(
        authContext.id,
        user.id,
        authContext.token
      );
      if (success) {
        setUser((prev) => {
          return { ...prev, isFriend: false };
        });
      } else {
        alert(
          `Failed to unfriend ${user.firstname} ${user.lastname}. Please try again.`
        );
      }
    }
  };

  const returnHandler = () => {
    navigate(-1);
  };

  return (
    <div className="user-profile-page">
      {user.id ? (
        <div className="profile-info-container">
          <div className="profile-info-left">
            <div className="profile-picture-container">
              <img
                data-testid="profile-picture"
                src={`https://gravatar.com/avatar/${user.email_hash}?d=mp`}
                alt={`Profile picture of ${user.firstname} ${user.lastname}`}
              />
            </div>
            {!user.isFriend && user.isFriend !== undefined && (
              <div className="profile-info-left-button-container">
                {friendRequestSent ? (
                  <p data-testid="friend-request-sent">
                    &#x2714; Friend request sent
                  </p>
                ) : (
                  <Button type="action" onClick={sendFriendRequestHandler}>
                    Send friend request
                  </Button>
                )}
              </div>
            )}
            {user?.isFriend && (
              <div className="profile-info-left-button-container">
                <Button
                  testId="unfriend-user-button"
                  type="unfriend"
                  onClick={unfriendUserHandler}
                >
                  Unfriend
                </Button>
              </div>
            )}
          </div>
          <div className="profile-details-container">
            <div className="profile-details-header">
              <h2 data-testid="user-name" id="user-name">
                {user.firstname} {user.lastname}
              </h2>
              {user.id === authContext.id && (
                <div className="profile-details-header-actions">
                  {!user.premium && (
                    <Button type="confirm" onClick={upgradeToPremiumHandler}>
                      Upgrade to premium
                    </Button>
                  )}
                  <Button
                    id="edit-profile-button"
                    type="action"
                    onClick={editProfileHandler}
                  >
                    Edit profile
                  </Button>
                </div>
              )}
            </div>
            <p data-testid="user-city" id="user-city">
              {user.city}
            </p>
            {!!user.premium && <PremiumBadge />}
            <p data-testid="user-bio">{user.bio}</p>
            {user.id === authContext.id && (
              <div
                data-testid="private-details-container"
                className="private-details-container"
              >
                <p
                  data-testid="private-details-heading"
                  id="private-details-heading"
                >
                  These are visible only to you
                </p>
                <p data-testid="user-address" id="user-address">
                  Address: {user.postalcode}, {user.city}, {user.country}
                </p>
                <p data-testid="user-email" id="user-email">
                  Email: {user.email}
                </p>
                <p data-testid="user-phone" id="user-phone">
                  Phone: {user.phone}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          data-testid="user-not-found-container"
          className="user-not-found-container"
        >
          <h1>User not found</h1>
          <Button type="action" onClick={returnHandler}>
            Return to previous page
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
