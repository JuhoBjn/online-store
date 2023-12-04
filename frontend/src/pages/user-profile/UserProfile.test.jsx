import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import { AuthContext } from "../../utils/AuthContext";
import UserProfile from "./UserProfile";

describe("The user profile page", () => {
  const { sign } = jwt;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserProfile />,
      loader: () => {
        return {
          id: "a30a066a-faa7-45b9-b1e1-b4b5f6d92b09",
          role: "user",
          firstname: "Timothy",
          lastname: "Tester",
          bio: "This is the profile of Timothy the Tester.",
          email: "timothy@tester.com",
          email_hash:
            "d743b0938a06aeedb1716a06cb23405b94045a2138879f8703dc29964d35aa35",
          postalcode: "00100",
          city: "Helsinki",
          country: "fi",
          phone: "1234567890",
          premium: 1
        };
      }
    }
  ]);

  const friendRouter = createBrowserRouter([
    {
      path: "/",
      element: <UserProfile />,
      loader: () => {
        return {
          id: "ddfffcd7-983c-4f83-b998-884c36bea194",
          role: "user",
          firstname: "Thomas",
          lastname: "Tester",
          bio: "This is the profile of Thomas the Tester.",
          email: "thomas@test.com",
          email_hash:
            "d743b0938a06aeedb1716a06cb23405b94045a2138879f8703dc29964d35aa35",
          postalcode: "00100",
          city: "Helsinki",
          country: "fi",
          phone: "1234567890",
          premium: 1,
          isFriend: true
        };
      }
    }
  ]);

  const userAuth = {
    id: "a30a066a-faa7-45b9-b1e1-b4b5f6d92b09",
    token: sign({ id: this.id }, "super-secret-test-key", { expiresIn: "30m" })
  };

  it("should display a user profile picture", () => {
    render(
      <AuthContext.Provider value={userAuth}>
        <RouterProvider router={router}>
          <UserProfile />
        </RouterProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId("profile-picture")).toBeInTheDocument();
  });

  it("should display the user's name", () => {
    render(
      <AuthContext.Provider value={userAuth}>
        <RouterProvider router={router}>
          <UserProfile />
        </RouterProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId("user-name")).toBeInTheDocument();
  });

  it("should display the city the user lives in", () => {
    render(
      <AuthContext.Provider value={userAuth}>
        <RouterProvider router={router}>
          <UserProfile />
        </RouterProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId("user-city")).toBeInTheDocument();
  });

  it("should display a premium badge for a premium user", () => {
    render(
      <AuthContext.Provider value={userAuth}>
        <RouterProvider router={router}>
          <UserProfile />
        </RouterProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId("premium-badge")).toBeInTheDocument();
  });

  it("should display the user's bio text", () => {
    render(
      <AuthContext.Provider value={userAuth}>
        <RouterProvider router={router}>
          <UserProfile />
        </RouterProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId("user-bio")).toBeInTheDocument();
  });

  it("should display private profile info when viewing own profile", () => {
    render(
      <AuthContext.Provider value={userAuth}>
        <RouterProvider router={router}>
          <UserProfile />
        </RouterProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId("private-details-container")).toBeInTheDocument();
    expect(screen.getByTestId("private-details-heading")).toBeInTheDocument();
    expect(screen.getByTestId("user-address")).toBeInTheDocument();
    expect(screen.getByTestId("user-email")).toBeInTheDocument();
    expect(screen.getByTestId("user-phone")).toBeInTheDocument();
  });

  it("should display an unfriend user button on a friend user's profile", () => {
    render(
      <AuthContext.Provider value={userAuth}>
        <RouterProvider router={friendRouter} />
      </AuthContext.Provider>
    );

    expect(screen.getByTestId("unfriend-user-button")).toBeInTheDocument();
  });
});
