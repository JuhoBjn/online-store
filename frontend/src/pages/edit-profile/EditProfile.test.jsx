import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditProfile from "./EditProfile";

describe("The profile editing page", () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <EditProfile />,
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

  it("should display a form to edit a user's profile", () => {
    render(
      <RouterProvider router={router}>
        <EditProfile />
      </RouterProvider>
    );

    expect(screen.getByTestId("firstname-input")).toBeInTheDocument();
    expect(screen.getByTestId("lastname-input")).toBeInTheDocument();
    expect(screen.getByTestId("bio-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
    expect(screen.getByTestId("city-input")).toBeInTheDocument();
    expect(screen.getByTestId("postalcode-input")).toBeInTheDocument();
    expect(screen.getByTestId("country-input")).toBeInTheDocument();
  });
});
