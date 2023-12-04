import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CalendarSidebar from "./CalendarSidebar";

describe("The calendar sidebar component", () => {
  it("should display a month view calendar", () => {
    render(
      <BrowserRouter>
        <CalendarSidebar />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("calendar-sidebar-month-container")
    ).toBeInTheDocument();
  });

  it("should display a day view calendar", () => {
    render(
      <BrowserRouter>
        <CalendarSidebar />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("calendar-sidebar-day-container")
    ).toBeInTheDocument();
  });

  it("should display a button to navigate to the activities page", () => {
    render(
      <BrowserRouter>
        <CalendarSidebar />
      </BrowserRouter>
    );

    expect(screen.getByTestId("add-new-activity-button")).toBeInTheDocument();
  });
});
