import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CompactActivityList from "./CompactActivityList";

describe("The compact activity list", () => {
  const testActivities = [
    {
      id: 3,
      name: "Germany exchange",
      description:
        "The GoldenAge crew has set up an exchange with their partered business to the beautiful city of Rothenburg Ob Der Tauber.",
      picture_id: null,
      starts_at: "2023-12-15T20:43:48.000Z",
      ends_at: "2023-12-20T20:43:48.000Z",
      created_at: "2023-12-07T20:43:48.000Z",
      updated_at: "2023-12-07T20:43:48.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 2,
      name: "Karaoke Night",
      description: "Karaoke night at the old folks' home",
      picture_id: null,
      starts_at: "2023-12-12T20:43:48.000Z",
      ends_at: "2023-12-12T20:43:48.000Z",
      created_at: "2023-12-07T20:43:48.000Z",
      updated_at: "2023-12-07T20:43:48.000Z",
      image_object_key: null,
      image_url: null
    },
    {
      id: 1,
      name: "First event",
      description: "The opening event to start the season",
      picture_id: null,
      starts_at: "2023-12-08T20:43:47.000Z",
      ends_at: "2023-12-08T20:43:47.000Z",
      created_at: "2023-12-07T20:43:47.000Z",
      updated_at: "2023-12-07T20:43:47.000Z",
      image_object_key: null,
      image_url: null
    }
  ];

  it("should displya an unordered list component", () => {
    render(
      <BrowserRouter>
        <CompactActivityList activities={testActivities} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("compact-activity-list")).toBeInTheDocument();
  });

  it("should display a message if no activities are provided", () => {
    render(
      <BrowserRouter>
        <CompactActivityList />
      </BrowserRouter>
    );

    expect(screen.getByTestId("no-activities-found")).toBeInTheDocument();
  });

  it("should display a list of items when activities are provided", () => {
    render(
      <BrowserRouter>
        <CompactActivityList activities={testActivities} />
      </BrowserRouter>
    );

    expect(
      screen.getAllByTestId("compact-activity-list-item").length
    ).toBeGreaterThan(0);
  });

  it("should display the activity name in a link on list items", () => {
    render(
      <BrowserRouter>
        <CompactActivityList
          activities={[
            {
              id: 1,
              name: "First event",
              description: "The opening event to start the season",
              picture_id: null,
              starts_at: "2023-12-08T20:43:47.000Z",
              ends_at: "2023-12-08T20:43:47.000Z",
              created_at: "2023-12-07T20:43:47.000Z",
              updated_at: "2023-12-07T20:43:47.000Z",
              image_object_key: null,
              image_url: null
            }
          ]}
        />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("compact-activity-list-item-link")
    ).toBeInTheDocument();
  });

  it("should display an edit button on list items", () => {
    render(
      <BrowserRouter>
        <CompactActivityList
          activities={[
            {
              id: 1,
              name: "First event",
              description: "The opening event to start the season",
              picture_id: null,
              starts_at: "2023-12-08T20:43:47.000Z",
              ends_at: "2023-12-08T20:43:47.000Z",
              created_at: "2023-12-07T20:43:47.000Z",
              updated_at: "2023-12-07T20:43:47.000Z",
              image_object_key: null,
              image_url: null
            }
          ]}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("edit-activity-button")).toBeInTheDocument();
  });
});
