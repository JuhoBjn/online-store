import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ActivityListItem from "./ActivityListItem";

import ElatedPensioner from "../../assets/Elated_pensioner.jpg";

describe("The activity list item", () => {
  it("should display a list item element for the component", () => {
    render(
      <BrowserRouter>
        <ActivityListItem id={1} name="Test event" />
      </BrowserRouter>
    );

    expect(screen.getByTestId("activity-list-item")).toBeInTheDocument();
  });

  it("should display the name of the event", () => {
    render(
      <BrowserRouter>
        <ActivityListItem id={1} name="Test event" />
      </BrowserRouter>
    );

    expect(screen.getByTestId("activity-list-item-name")).toBeInTheDocument();
  });

  it("should not display an image when none is provided", () => {
    render(
      <BrowserRouter>
        <ActivityListItem id={1} name="Test event" />
      </BrowserRouter>
    );

    expect(
      screen.queryByTestId("activity-list-item-image")
    ).not.toBeInTheDocument();
  });

  it("should display an image when one is provided", () => {
    render(
      <BrowserRouter>
        <ActivityListItem id={1} name="Test event" imageUrl={ElatedPensioner} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("activity-list-item-image")).toBeInTheDocument();
  });
});
