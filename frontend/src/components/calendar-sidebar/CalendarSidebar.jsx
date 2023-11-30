import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./CalendarSidebar.css";

const CalendarSidebar = ({ calendar }) => {
  const [events, setEvents] = useState(calendar);

  useEffect(() => {
    console.log(events);
  }, events);

  return (
    <aside className="calendar-sidebar">
      <div className="calendar-sidebar-container">
      </div>
      <div></div>
    </aside>
  );
};

export default CalendarSidebar;
