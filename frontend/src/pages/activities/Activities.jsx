import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import ActivityList from "../../components/activity-list/ActivityList";

import "./Activities.css";

const Activities = () => {
  const [activities] = useState(useLoaderData());

  useEffect(() => {
    console.log(activities);
  }, [activities]);

  return (
    <div className="activities-page">
      <section
        data-testid="activities-container"
        className="activities-container"
      >
        <ActivityList activities={activities} />
      </section>
    </div>
  );
};

export default Activities;
