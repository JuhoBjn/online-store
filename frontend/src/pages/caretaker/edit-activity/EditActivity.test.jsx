import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditActivity from "./EditActivity";

const testRouter = createBrowserRouter([
  {
    path: "/",
    element: <EditActivity />,
    loader: () => {
      return {
        id: 2,
        name: "Karaoke Night",
        description: "Karaoke night at the old folks' home",
        picture_id: null,
        starts_at: "2023-12-12T22:23:32.000Z",
        ends_at: "2023-12-12T22:23:32.000Z",
        created_at: "2023-12-07T22:23:32.000Z",
        updated_at: "2023-12-07T22:23:32.000Z",
        image_object_key: null,
        image_url: null,
        signed_up: false
      };
    }
  }
]);

describe("The edit activity page", () => {
  it("should display a header with the page title", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("edit-activity-page-title")).toBeInTheDocument();
  });

  it("should display an input field for the activity name", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("edit-activity-name-input")).toBeInTheDocument();
  });

  it("should display an input field for the activity description", () => {
    render(<RouterProvider router={testRouter} />);

    expect(
      screen.getByTestId("edit-activity-description-input")
    ).toBeInTheDocument();
  });

  it("should display an input for the activity dates", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("edit-activity-date-picker")).toBeInTheDocument();
  });

  it("should display a button to delete the activity", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("delete-activity-button")).toBeInTheDocument();
  });

  it("should display a button to update the activity", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("update-activity-button")).toBeInTheDocument();
  });
});
