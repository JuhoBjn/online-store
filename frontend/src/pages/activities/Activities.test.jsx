import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Activities from "./Activities";

const testRouter = createBrowserRouter([
  {
    path: "/",
    element: <Activities />,
    loader: () => {
      return [
        {
          id: 3,
          name: "Germany exchange",
          description:
            "The GoldenAge crew has set up an exchange with their partered business to the beautiful city of Rothenburg Ob Der Tauber.",
          picture_id: null,
          starts_at: "2023-12-13T20:37:06.000Z",
          ends_at: "2023-12-18T20:37:06.000Z",
          created_at: "2023-12-05T20:37:06.000Z",
          updated_at: "2023-12-05T20:37:06.000Z",
          image_object_key: null,
          image_url: null
        },
        {
          id: 2,
          name: "Karaoke Night",
          description: "Karaoke night at the old folks' home",
          picture_id: null,
          starts_at: "2023-12-10T20:37:06.000Z",
          ends_at: "2023-12-10T20:37:06.000Z",
          created_at: "2023-12-05T20:37:06.000Z",
          updated_at: "2023-12-05T20:37:06.000Z",
          image_object_key: null,
          image_url: null
        },
        {
          id: 1,
          name: "First event",
          description: "The opening event to start the season",
          picture_id: null,
          starts_at: "2023-12-06T20:37:06.000Z",
          ends_at: "2023-12-06T20:37:06.000Z",
          created_at: "2023-12-05T20:37:06.000Z",
          updated_at: "2023-12-05T20:37:06.000Z",
          image_object_key: null,
          image_url: null
        }
      ];
    }
  }
]);

describe("The activities page", () => {
  it("should display a container element for the activities", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("activities-container")).toBeInTheDocument();
  });
});
