import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import CompactActivityList from "../../../components/compact-activity-list/CompactActivityList";

import "./CreatedActivities.css";

const CreatedActivities = () => {
  const [activities] = useState(useLoaderData());

  return (
    <div className="created-activities-page">
      <header
        data-testid="created-activities-header"
        className="created-activities-header"
      >
        <h2 data-testid="created-activities-title">Created activities</h2>
      </header>
      <section
        data-testid="created-activities-list-container"
        className="created-activities-list-container"
      >
        <CompactActivityList activities={activities} />
      </section>
    </div>
  );
};

export default CreatedActivities;
