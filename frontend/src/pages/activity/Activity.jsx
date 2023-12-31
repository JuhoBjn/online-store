import { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import { AuthContext } from "../../utils/AuthContext";
import { signupForActivity } from "../../utils/ActivityAPI";
import Button from "../../components/button/Button";
import Chat from "../../components/chat/Chat";

import "./Activity.css";

const Activity = () => {
  const [activity] = useState(useLoaderData());
  const [signedUp, setSignedUp] = useState(false);
  const authContext = useContext(AuthContext);

  const isSignedUp = signedUp || activity.signed_up;
  const isEventNotStartedYet = new Date() < new Date(activity.starts_at);

  const signupHandler = async () => {
    const success = await signupForActivity(
      activity.id,
      authContext.id,
      authContext.token
    );
    if (success) {
      setSignedUp(true);
    } else {
      alert(`Failed to sign up for ${activity.name}. Please try again`);
    }
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    )}`;
  };

  return (
    <div className="activity-page">
      <article className="activity-container">
        {activity.image_url && (
          <div className="activity-image-container">
            <img
              data-testid="activity-image"
              className="activity-image"
              src={activity.image_url}
              alt={`Picture for ${activity.name}`}
            />
          </div>
        )}
        <header className="activity-header">
          <h1 data-testid="activity-name" className="activity-name">
            {activity.name}
          </h1>
          <section className="activity-header-dates-container">
            <p data-testid="activity-start-date">
              Starts {formatDate(activity.starts_at)}
            </p>
            <p data-testid="activity-end-date">
              Ends {formatDate(activity.ends_at)}
            </p>
          </section>
        </header>
        <section className="activity-body">
          <p
            data-testid="activity-description"
            className="activity-body-description"
          >
            {activity.description}
          </p>
        </section>
        <footer className="activity-footer">
          {isSignedUp ? (
            <p data-testid="activity-signed-up">&#x2714; Signed up</p>
          ) : (
            <Button
              testId="activity-signup-button"
              type="confirm"
              onClick={signupHandler}
            >
              Sign up for the event here
            </Button>
          )}
        </footer>
        <div className="activity__chat-container">
          {isSignedUp ? (
            <Chat
              user={{
                token: authContext.token,
                firstname: authContext.firstname,
                lastname: authContext.lastname,
                id: authContext.id
              }}
              eventId={activity.id}
              // eventName={activity.name} // not showing event name in chat as it is already shown in the activity page
              isDisabled={isEventNotStartedYet}
              disabledMessage={
                isEventNotStartedYet
                  ? "Chat is disabled until the event has started"
                  : ""
              }
            />
          ) : null}
        </div>
      </article>
    </div>
  );
};

export default Activity;
