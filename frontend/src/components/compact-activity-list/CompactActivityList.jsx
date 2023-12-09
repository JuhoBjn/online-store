import { Link, useNavigate } from "react-router-dom";

import Button from "../button/Button";

import "./CompactActivityList.css";

const CompactActivityList = ({ activities }) => {
  const navigate = useNavigate();

  if (!activities || activities.length === 0) {
    return <h3 data-testid="no-activities-found">No activities found</h3>;
  }

  const editButtonHandler = (activityId) => {
    navigate(`/caretaker/activities/${activityId}/edit`);
  };

  return (
    <ul data-testid="compact-activity-list" className="compact-activity-list">
      {activities.map((activity) => (
        <li
          data-testid="compact-activity-list-item"
          className="compact-activity-list-item"
          key={activity.id}
        >
          <Link
            id="compact-activity-link"
            data-testid="compact-activity-list-item-link"
            className="compact-activity-link"
            to={`/activity/${activity.id}`}
          >
            {activity.name}
          </Link>
          <Button
            testId="edit-activity-button"
            type="action"
            onClick={() => editButtonHandler(activity.id)}
          >
            Edit
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default CompactActivityList;
