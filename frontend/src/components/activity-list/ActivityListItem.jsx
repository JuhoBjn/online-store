import { useNavigate } from "react-router-dom";

import "./ActivityListItem.css";

const ActivityListItem = ({ id, imageUrl, name }) => {
  const navigate = useNavigate();

  const navigateToActivityHandler = () => {
    navigate(`/activity/${id}`);
  };

  return (
    <li
      data-testid="activity-list-item"
      className="activity-list-item"
      onClick={navigateToActivityHandler}
    >
      {imageUrl && (
        <img
          data-testid="activity-list-item-image"
          className="activity-list-item-image"
          src={imageUrl}
          alt={`Thumbnail picture for ${name}`}
        />
      )}
      <h3
        data-testid="activity-list-item-name"
        className="activity-list-item-name"
      >
        {name}
      </h3>
    </li>
  );
};

export default ActivityListItem;
