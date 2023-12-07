import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import { AuthContext } from "../../../utils/AuthContext";
import Button from "../../../components/button/Button";
import { createActivity } from "../../../utils/ActivityAPI";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "./NewActivity.css";

const NewActivity = () => {
  const [activity, setActivity] = useState(null);
  const [activityPicture, setActivityPicture] = useState(null);
  const [activityDates, setActivityDates] = useState([new Date(), new Date()]);
  const [activityPicturePreview, setActivityPicturePreview] = useState(null);
  const [activityCreated, setActivityCreated] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const pictureHandler = (event) => {
    event.preventDefault();

    const picture = event.target.files[0];

    // Display an alert and discard the iamge if the file is
    // larger than 5MiB.
    if (picture.size > 1024 * 1024 * 5) {
      return alert("Image file is too large, please select a smaller image.");
    }

    const reader = new FileReader();
    setActivityPicture(picture);
    reader.onload = (e) => {
      setActivityPicturePreview(e.target.result);
    };
    reader.readAsDataURL(picture);
  };

  const updateActivityState = (event) => {
    event.preventDefault();

    setActivity((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const createNewActivity = async (event) => {
    event.preventDefault();

    const requestObject = {
      name: activity.name,
      description: activity.description,
      starts_at: activityDates.at(0) || new Date(),
      ends_at: activityDates.at(1) || new Date()
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(requestObject));
    if (activityPicture) {
      formData.append("file", activityPicture);
    }

    const response = await createActivity(formData, authContext.token);
    if (response) {
      setActivityCreated(true);
      setTimeout(() => navigate("/caretaker", 1000));
    } else {
      console.error("Failed to create activity");
      alert("Failed to create activity. Please try again.");
    }
  };

  return (
    <div className="new-activity-page">
      <section className="new-activity-form-container">
        <form className="new-activity-form" onSubmit={createNewActivity}>
          <div className="new-activity-form-picture-input-container">
            {activityPicture && (
              <img
                id="activity-picture-preview"
                src={activityPicturePreview}
                alt="Activity picture input"
              />
            )}
            <h3>Click here to upload an image</h3>
            <input
              id="activity-picture-input"
              data-testid="activity-picture-input"
              name="file"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={pictureHandler}
            />
          </div>
          <div className="new-activity-form-name-container">
            <label htmlFor="activity-name-input">Name</label>
            <input
              id="activity-name-input"
              type="text"
              data-testid="activity-name-input"
              name="name"
              placeholder="Enter a name"
              value={activity?.name ? activity.name : ""}
              onChange={() => updateActivityState(event)}
              minLength={1}
              maxLength={255}
              required
            />
          </div>
          <div className="new-activity-description-input-container">
            <label htmlFor="activity-description-input">
              Activity description
            </label>
            <textarea
              id="activity-description-input"
              name="description"
              data-testid="activity-description-input"
              placeholder="Enter activity description here"
              onChange={() => updateActivityState(event)}
              minLength={1}
              maxLength={4096}
              required
            />
          </div>
          <div className="new-activity-form-date-input-container">
            <label htmlFor="activity-date-picker">Start and end dates</label>
            <DateRangePicker
              id="activity-date-picker"
              value={activityDates}
              onChange={setActivityDates}
            />
          </div>
          {activityCreated ? (
            <p>&#x2714; Activity created</p>
          ) : (
            <Button testId="create-activity-button" type="confirm">
              Create activity
            </Button>
          )}
        </form>
      </section>
    </div>
  );
};

export default NewActivity;
