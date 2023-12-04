import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import FriendRequests from "./FriendRequests";

const testRouter = createBrowserRouter([
  {
    path: "/",
    element: <FriendRequests />,
    loader: () => {
      return [
        {
          id: 1,
          requester_user_id: "e16a6eac-9993-4137-9221-7c879337bbe4",
          requested_friend_user_id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
          requester_first_name: "Anthony",
          requester_last_name: "Administrator",
          is_rejected: 0,
          is_accepted: 1,
          is_request_pending: 0,
          requester_email_hash:
            "f1e62e2b9bcdb133a33603e1bdc67d9c08d1bef9e586d6b744fb9dfa535c585f"
        },
        {
          id: 2,
          requester_user_id: "92d3c5a9-6719-41bd-abb9-de15676e3442",
          requested_friend_user_id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
          requester_first_name: "Jorma",
          requester_last_name: "Korhonen",
          is_rejected: 1,
          is_accepted: 0,
          is_request_pending: 0,
          requester_email_hash:
            "d743b0938a06aeedb1716a06cb23405b94045a2138879f8703dc29964d35aa35"
        }
      ];
    }
  }
]);

describe("The friend request page", () => {
  it("should display a list of friend requests", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("friend-requests-list")).toBeInTheDocument();
  });
});
