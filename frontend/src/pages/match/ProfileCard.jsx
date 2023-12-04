import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  if (!user) {
    return (
      <div className="profile-card-no-users">
        <h2>No user to display</h2>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-card-image-container">
        <img
          id="profile-card-image"
          data-testid="profile-card-image"
          src={`https://gravatar.com/avatar/${user.emailhash}?d=mp`}
          alt={`Profile picture of ${user.firstname} ${user.lastname}`}
        />
      </div>
      <div className="profile-card-content">
        <div className="profile-card-content-header">
          <span id="profile-card-header-title">
            <h2
              id="profile-card-user-name"
              data-testid="profile-card-user-name"
            >
              {user.firstname} {user.lastname}
            </h2>
          </span>
          <h3 data-testid="profile-card-user-city">
            {user.city}, {user.country}
          </h3>
        </div>
        <hr className="profile-card-content-separator" />
        <div className="profile-card-content-body">
          <p data-testid="profile-card-user-bio">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
