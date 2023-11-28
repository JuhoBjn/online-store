import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import FriendListItem from "./FriendListItem";

describe("The friend list item component", () => {
  const testUser = {
    id: "92d3c5a9-6719-41bd-abb9-de15676e3442",
    emailHash:
      "d743b0938a06aeedb1716a06cb23405b94045a2138879f8703dc29964d35aa35",
    firstname: "Jorma",
    lastname: "Korhonen"
  };

  it("should display a profile picture", () => {
    render(
      <BrowserRouter>
        <FriendListItem
          id={testUser.id}
          emailHash={testUser.emailHash}
          firstname={testUser.firstname}
          lastname={testUser.lastname}
        />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("friend-list-item-profile-picture")
    ).toBeInTheDocument();
  });

  it("should display the friend user's name", () => {
    render(
      <BrowserRouter>
        <FriendListItem
          id={testUser.id}
          emailHash={testUser.emailHash}
          firstname={testUser.firstname}
          lastname={testUser.lastname}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("friend-list-item-username"));
  });
});
