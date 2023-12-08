import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import CreatedActivities from "./CreatedActivities";

const testRouter = createBrowserRouter([
  {
    path: "/",
    element: <CreatedActivities />,
    loader: () => {
      return [
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
    }
  }
]);

describe("The created activities page", () => {
  it("should display a header with title", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("created-activities-header")).toBeInTheDocument();
    expect(screen.getByTestId("created-activities-title")).toBeInTheDocument();
  });

  it("should display a container element for the list of created activities", () => {
    render(<RouterProvider router={testRouter} />);

    expect(
      screen.getByTestId("created-activities-list-container")
    ).toBeInTheDocument();
  });
});
