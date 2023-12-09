import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Match from "./Match";

const testRouter = createBrowserRouter([
  {
    path: "/",
    element: <Match />,
    loader: () => {
      return [
        {
          id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
          firstname: "Larry",
          lastname: "Smith",
          bio: "This is the profile of Larry Smith, a caretaker at GoldenAge who does not have a premium account.",
          email: "larrys@test.com",
          emailhash:
            "3e68793562735024a895fc9acbc7b4515afc0cd34a8db7c405b8db4eb3f0b5df",
          postalcode: "90100",
          city: "Oulu",
          country: "fi",
          phone: "5293471805",
          premium: 0
        }
      ];
    }
  }
]);

describe("The match page", () => {
  it("should display a profile card for a user", () => {
    render(
      <RouterProvider router={testRouter}>
        <Match />
      </RouterProvider>
    );

    expect(
      screen.getByTestId("match-page_profile-card-container")
    ).toBeInTheDocument();
  });

  it("should display accept and pass buttons", () => {
    render(
      <RouterProvider router={testRouter}>
        <Match />
      </RouterProvider>
    );

    expect(screen.getByTestId("pass-button-container")).toBeInTheDocument();
    expect(screen.getByTestId("accept-button-container")).toBeInTheDocument();
  });
});
