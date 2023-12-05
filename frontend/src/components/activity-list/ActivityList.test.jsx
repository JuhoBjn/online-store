import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ActivityList from "./ActivityList";

describe("The activity list item", () => {
  const testActivities = [
    {
      id: 3,
      name: "Germany exchange",
      description:
        "The GoldenAge crew has set up an exchange with their partered business to the beautiful city of Rothenburg Ob Der Tauber.",
      picture_id: null,
      starts_at: "2023-12-13T10:15:01.000Z",
      ends_at: "2023-12-18T10:15:01.000Z",
      created_at: "2023-12-05T10:15:01.000Z",
      updated_at: "2023-12-05T10:15:01.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 2,
      name: "Karaoke Night",
      description: "Karaoke night at the old folks' home",
      picture_id: null,
      starts_at: "2023-12-10T10:15:01.000Z",
      ends_at: "2023-12-10T10:15:01.000Z",
      created_at: "2023-12-05T10:15:01.000Z",
      updated_at: "2023-12-05T10:15:01.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 1,
      name: "First event",
      description: "The opening event to start the season",
      picture_id: null,
      starts_at: "2023-12-06T10:15:00.000Z",
      ends_at: "2023-12-06T10:15:00.000Z",
      created_at: "2023-12-05T10:15:00.000Z",
      updated_at: "2023-12-05T10:15:00.000Z",
      image_object_key: null,
      image_url: null
    }
  ];
  it("should display a message when no activities are provided", () => {
    render(
      <BrowserRouter>
        <ActivityList />
      </BrowserRouter>
    );

    expect(screen.getByTestId("no-activities-found")).toBeInTheDocument();
  });

  it("should display a container element for the list", () => {
    render(
      <BrowserRouter>
        <ActivityList activities={testActivities} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("activity-list-container")).toBeInTheDocument();
  });

  it("should display an unordered list", () => {
    render(
      <BrowserRouter>
        <ActivityList activities={testActivities} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("activity-list")).toBeInTheDocument();
  });
});
