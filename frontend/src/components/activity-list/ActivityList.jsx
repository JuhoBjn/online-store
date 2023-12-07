import ActivityListItem from "./ActivityListItem";

import "./ActivityList.css";

const ActivityList = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <h3 data-testid="no-activities-found">No activities found</h3>;
  }

  return (
    <section
      data-testid="activity-list-container"
      className="activity-list-container"
    >
      <ul data-testid="activity-list" className="activity-list">
        {activities.map((activity) => (
          <ActivityListItem
            key={activity.id}
            id={activity.id}
            imageUrl={activity.image_url}
            name={activity.name}
          />
        ))}
      </ul>
    </section>
  );
};

export default ActivityList;
