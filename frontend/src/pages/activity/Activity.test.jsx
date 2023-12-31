import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ElatedPensioner from "../../assets/Elated_pensioner.jpg";
import Activity from "./Activity";

const noImageRouter = createBrowserRouter([
  {
    path: "/",
    element: <Activity />,
    loader: () => {
      return {
        id: 1,
        name: "Golden Memories Gala",
        description:
          "Join us for an enchanting evening at the Golden Memories Gala, a nostalgic celebration for the elderly. Revel in live music, share cherished stories, and savor delectable cuisine. Let's create golden moments together, honoring a lifetime of memories and building new connections.",
        picture_id: null,
        starts_at: "2023-12-05T20:25:23.000Z",
        ends_at: "2023-12-05T23:25:23.000Z",
        created_at: "2023-12-05T20:25:23.000Z",
        updated_at: "2023-12-05T20:25:23.000Z",
        image_object_key: null,
        image_url: null,
        signed_up: false
      };
    }
  }
]);

const imageRouter = createBrowserRouter([
  {
    path: "/",
    element: <Activity />,
    loader: () => {
      return {
        id: 1,
        name: "Golden Memories Gala",
        description:
          "Join us for an enchanting evening at the Golden Memories Gala, a nostalgic celebration for the elderly. Revel in live music, share cherished stories, and savor delectable cuisine. Let's create golden moments together, honoring a lifetime of memories and building new connections.",
        picture_id: null,
        starts_at: "2023-12-05T20:25:23.000Z",
        ends_at: "2023-12-05T23:25:23.000Z",
        created_at: "2023-12-05T20:25:23.000Z",
        updated_at: "2023-12-05T20:25:23.000Z",
        image_object_key: null,
        image_url: ElatedPensioner,
        signed_up: false
      };
    }
  }
]);

// const signedUpRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Activity />,
//     loader: () => {
//       return {
//         id: 1,
//         name: "Golden Memories Gala",
//         description:
//           "Join us for an enchanting evening at the Golden Memories Gala, a nostalgic celebration for the elderly. Revel in live music, share cherished stories, and savor delectable cuisine. Let's create golden moments together, honoring a lifetime of memories and building new connections.",
//         picture_id: null,
//         starts_at: "2023-12-05T20:25:23.000Z",
//         ends_at: "2023-12-05T23:25:23.000Z",
//         created_at: "2023-12-05T20:25:23.000Z",
//         updated_at: "2023-12-05T20:25:23.000Z",
//         image_object_key: null,
//         image_url: ElatedPensioner,
//         signed_up: true
//       };
//     }
//   }
// ]);

describe("The activity page", () => {
  it("should display an image if one is provided", () => {
    render(<RouterProvider router={imageRouter} />);

    expect(screen.getByTestId("activity-image")).toBeInTheDocument();
  });

  it("should not display an image if there is none", () => {
    render(<RouterProvider router={noImageRouter} />);

    expect(screen.queryByTestId("activity-image")).not.toBeInTheDocument();
  });

  it("should display the activity name", () => {
    render(<RouterProvider router={noImageRouter} />);

    expect(screen.getByTestId("activity-name")).toBeInTheDocument();
  });

  it("should display the date and time the activity starts", () => {
    render(<RouterProvider router={imageRouter} />);

    expect(screen.getByTestId("activity-start-date")).toBeInTheDocument();
  });

  it("should display the date and time the activity ends", () => {
    render(<RouterProvider router={noImageRouter} />);

    expect(screen.getByTestId("activity-end-date")).toBeInTheDocument();
  });

  it("should display the activity description", () => {
    render(<RouterProvider router={noImageRouter} />);

    expect(screen.getByTestId("activity-description")).toBeInTheDocument();
  });

  it("should display a button to  sign up for an event", () => {
    render(<RouterProvider router={noImageRouter} />);

    expect(screen.getByTestId("activity-signup-button")).toBeInTheDocument();
  });

  // This test is failing because the the authContext is not being set up properly in the test.
  // Auth context is needed for the Chat component to render -> errors out
  // @TODO: Fix this test
  // it("should diplay a message if the user has already signed up for the activity", () => {
  //   render(<RouterProvider router={signedUpRouter} />);

  //   expect(screen.getByTestId("activity-signed-up")).toBeInTheDocument();
  // });
});
