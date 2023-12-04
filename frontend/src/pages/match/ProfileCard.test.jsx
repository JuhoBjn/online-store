import { render, screen } from "@testing-library/react";

import ProfileCard from "./ProfileCard";

describe("The profile card component", () => {
  const testUser = {
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
  };

  it("should display a profile image", () => {
    render(<ProfileCard user={testUser} />);

    expect(screen.getByTestId("profile-card-image")).toBeInTheDocument();
  });

  it("should display the user's name", () => {
    render(<ProfileCard user={testUser} />);

    expect(screen.getByTestId("profile-card-user-name")).toBeInTheDocument();
  });

  it("should display the user's city", () => {
    render(<ProfileCard user={testUser} />);

    expect(screen.getByTestId("profile-card-user-city")).toBeInTheDocument();
  });

  it("should display the user's bio", () => {
    render(<ProfileCard user={testUser} />);

    expect(screen.getByTestId("profile-card-user-bio")).toBeInTheDocument();
  });
});
