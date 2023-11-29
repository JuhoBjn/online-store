import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Friends from "./Friends";

const testRouter = createBrowserRouter([
  {
    path: "/",
    element: <Friends />,
    loader: () => {
      return [
        {
          id: 3,
          user_id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
          friend_user_id: "59158c35-8d77-43f1-bc63-3c5b4265b276",
          friend_first_name: "Bob",
          friend_last_name: "Builer",
          is_unfriended: 0,
          became_friends_at: "2023-11-27T20:16:56.000Z",
          updated_at: "2023-11-27T20:16:56.000Z",
          friend_email_hash:
            "b0eef889085f8b8b05b86e24811ab55cbb762898dfca1f10288c48c3b362f507"
        },
        {
          id: 2,
          user_id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
          friend_user_id: "858560f9-fc03-43b0-b931-01213e4787ce",
          friend_first_name: "Lotta",
          friend_last_name: "Schmiedmann",
          is_unfriended: 0,
          became_friends_at: "2023-11-27T20:16:56.000Z",
          updated_at: "2023-11-27T20:16:56.000Z",
          friend_email_hash:
            "889e9148a3dfd6e255e4202b173028a68f68fd0065d2b4fbf958bc23aa546ea1"
        },
        {
          id: 6,
          user_id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
          friend_user_id: "ddfffcd7-983c-4f83-b998-884c36bea194",
          friend_first_name: "Thomas",
          friend_last_name: "Tester",
          is_unfriended: 1,
          became_friends_at: "2023-11-27T20:16:56.000Z",
          updated_at: "2023-11-27T20:16:56.000Z",
          friend_email_hash:
            "b06d9542262e671911412481ad54c5e535216ffb686cb881e8a55197bad59b81"
        },
        {
          id: 8,
          user_id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
          friend_user_id: "e16a6eac-9993-4137-9221-7c879337bbe4",
          friend_first_name: "Anthony",
          friend_last_name: "Administrator",
          is_unfriended: 0,
          became_friends_at: "2023-11-27T20:20:35.000Z",
          updated_at: "2023-11-27T20:20:35.000Z",
          friend_email_hash:
            "f1e62e2b9bcdb133a33603e1bdc67d9c08d1bef9e586d6b744fb9dfa535c585f"
        }
      ];
    }
  }
]);

describe("The friends page", () => {
  it("should display a list of a user's friends", () => {
    render(
      <RouterProvider router={testRouter}>
        <Friends />
      </RouterProvider>
    );

    expect(screen.getByTestId("friends-list")).toBeInTheDocument();
  });
});
