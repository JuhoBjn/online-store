import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import NewActivity from "./NewActivity";

describe("The new activity page", () => {
  it("should display a form for creating an activity", () => {
    render(
      <BrowserRouter>
        <NewActivity />
      </BrowserRouter>
    );

    expect(screen.getByTestId("new-activity-form")).toBeInTheDocument();
  });

  it("should display an input for a picture", () => {
    render(
      <BrowserRouter>
        <NewActivity />
      </BrowserRouter>
    );

    expect(screen.getByTestId("activity-picture-input")).toBeInTheDocument();
  });

  it("should display an input for the activity name", () => {
    render(
      <BrowserRouter>
        <NewActivity />
      </BrowserRouter>
    );

    expect(screen.getByTestId("activity-name-input")).toBeInTheDocument();
  });

  it("should display am input for the activity description", () => {
    render(
      <BrowserRouter>
        <NewActivity />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("activity-description-input")
    ).toBeInTheDocument();
  });

  it("should display a form for creating an activity", () => {
    render(
      <BrowserRouter>
        <NewActivity />
      </BrowserRouter>
    );

    expect(screen.getByTestId("activity-date-picker")).toBeInTheDocument();
  });

  it("should display a button to create the activity", () => {
    render(
      <BrowserRouter>
        <NewActivity />
      </BrowserRouter>
    );

    expect(screen.getByTestId("create-activity-button")).toBeInTheDocument();
  });
});
