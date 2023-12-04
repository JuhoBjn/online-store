import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import FriendsPage from "./FriendsPage";

describe("The friends page", () => {
  it("should display a container for the content", () => {
    render(
      <BrowserRouter>
        <FriendsPage />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("friends-page-content-container")
    ).toBeInTheDocument();
  });

  it("should display a bar to toggle between friend and friend request tabs", () => {
    render(
      <BrowserRouter>
        <FriendsPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("friends-tab-link")).toBeInTheDocument();
    expect(screen.getByTestId("friend-requests-tab-link")).toBeInTheDocument();
  });
});
