import { render, screen } from "@testing-library/react";

import DropdownMenu from "./DropdownMenu";

describe("The dropdown menu", () => {
  it("should display an option to navigate to profile", () => {
    render(<DropdownMenu />);

    expect(screen.getByTestId("go-to-profile")).toBeInTheDocument();
  });

  it("should display caretakers the option to navigate to caretaker portal when", () => {
    render(<DropdownMenu userRole="caretaker" />);

    expect(screen.getByTestId("go-to-caretaker-page"));
  });

  it("should display on option to log out", () => {
    render(<DropdownMenu />);

    expect(screen.getByTestId("log-out")).toBeInTheDocument();
  });
});
