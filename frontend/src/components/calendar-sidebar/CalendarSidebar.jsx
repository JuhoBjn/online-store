import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import Button from "../button/Button";

import "./CalendarSidebar.css";

const CalendarSidebar = ({ calendar }) => {
  const [events] = useState(calendar);
  const navigate = useNavigate();

  // Navigate to the event page when event is clicked.
  const eventClickHandler = (clickedEvent) => {
    navigate(`/activity/${clickedEvent.event.extendedProps.eventId}`);
  };

  const navigateToActivitiesHandler = () => {
    navigate("/activities");
  };

  return (
    <aside className="calendar-sidebar">
      <div
        data-testid="calendar-sidebar-month-container"
        className="calendar-sidebar-month-container"
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          fixedWeekCount={false}
          firstDay={1}
          events={events}
          eventColor="#604137"
          displayEventTime={false}
          headerToolbar={{
            start: "title",
            center: "",
            end: "prev,next"
          }}
          height="auto"
          eventClick={eventClickHandler}
        />
      </div>
      <div
        data-testid="calendar-sidebar-day-container"
        className="calendar-sidebar-day-container"
      >
        <h3 id="calendar-sidebar-day-schedule-title">Today&apos;s schedule</h3>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridDay"
          events={events}
          eventColor="#604137"
          displayEventTime={true}
          height="calc(100% - 0.5em - 20px)"
          headerToolbar={false}
          eventClick={eventClickHandler}
        />
      </div>
      <Button
        testId="add-new-activity-button"
        type="action"
        onClick={navigateToActivitiesHandler}
      >
        Add new activity +
      </Button>
    </aside>
  );
};

export default CalendarSidebar;
