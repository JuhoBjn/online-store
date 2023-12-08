import { useState, useRef, useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import { AuthContext } from "../../../utils/AuthContext";
import Button from "../../../components/button/Button";
import { updateActivity, deleteActivity } from "../../../utils/ActivityAPI";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "./EditActivity.css";

const EditActivity = () => {
  const [activity, setActivity] = useState(useLoaderData());
  const [activityDates, setActivityDates] = useState([new Date(), new Date()]);
  const [activityPicturePreview, setActivityPicturePreview] = useState(null);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const activityPicturePreviewSetRef = useRef(false);
  const activityDatesSetRef = useRef(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const updateActivityState = (event) => {
    event.preventDefault();

    setActivity((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const updateActivityHandler = async (event) => {
    event.preventDefault();

    const updatedActivity = {
      name: activity.name,
      description: activity.description,
      starts_at: activityDates.at(0) || new Date(),
      ends_at: activityDates.at(1) || new Date()
    };

    const updateSuccessful = await updateActivity(
      activity.id,
      updatedActivity,
      authContext.token
    );
    if (updateSuccessful) {
      setActionCompleted(true);
      setActionMessage("Activity updated");
      setTimeout(() => {
        navigate("/caretaker");
      }, 1000);
    } else {
      alert("Failed to update activity. Please try again.");
    }
  };

  const deleteActivityHandler = async (event) => {
    event.preventDefault();

    const deleteSuccessful = await deleteActivity(
      activity.id,
      authContext.token
    );
    if (deleteSuccessful) {
      setActionCompleted(true);
      setActionMessage("Activity deleted");
      setTimeout(() => {
        navigate("/caretaker");
      }, 1000);
    } else {
      alert("Failed to delete activity. Please try again.");
    }
  };

  useEffect(() => {
    if (activity?.image_url && !activityPicturePreviewSetRef.current) {
      setActivityPicturePreview(activity.image_url);
      activityPicturePreviewSetRef.current = true;
    }

    if (!activityDatesSetRef.current) {
      setActivityDates([activity.starts_at, activity.ends_at]);
      activityDatesSetRef.current = true;
    }
  }, [activity, activityPicturePreview, activityPicturePreviewSetRef]);

  return (
    <div className="edit-activity-page">
      <header
        data-testid="edit-activity-page-header"
        className="edit-activity-page-header"
      >
        <h2 data-testid="edit-activity-page-title">Edit activity</h2>
      </header>
      <div className="edit-activity-form-container">
        <form className="edit-activity-form" onSubmit={updateActivityHandler}>
          {activityPicturePreview && (
            <div className="edit-activity-picture-container">
              <img
                id="activity-picture"
                src={activityPicturePreview}
                alt="Uploaded activity picture"
              />
            </div>
          )}
          <div className="edit-activity-page-name-input-container">
            <label htmlFor="activity-name-input">Name</label>
            <input
              id="activity-name-input"
              type="text"
              data-testid="edit-activity-name-input"
              name="name"
              placeholder="Enter a name"
              value={activity?.name ? activity.name : ""}
              onChange={() => updateActivityState(event)}
              required
            />
          </div>
          <div className="edit-activity-page-description-input-container">
            <label htmlFor="description-input">Description</label>
            <textarea
              id="description-input"
              name="description"
              data-testid="edit-activity-description-input"
              placeholder="Enter activity description here"
              value={activity?.description ? activity.description : ""}
              onChange={() => updateActivityState(event)}
              minLength={1}
              maxLength={4096}
              required
            />
          </div>
          <div
            data-testid="activity-dates-input-container"
            className="activity-dates-input-container"
          >
            <label htmlFor="edit-activity-date-picker">
              Start and end dates
            </label>

            <DateRangePicker
              id="edit-activity-date-picker"
              data-testid="edit-activity-date-picker"
              value={activityDates}
              onChange={setActivityDates}
            />
          </div>
          <footer className="edit-activity-footer">
            {actionCompleted ? (
              <p>{actionMessage}</p>
            ) : (
              <>
                <Button
                  testId="delete-activity-button"
                  type="danger"
                  onClick={deleteActivityHandler}
                >
                  Delete activity
                </Button>
                <Button testId="update-activity-button" type="action">
                  Update activity
                </Button>
              </>
            )}
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditActivity;
