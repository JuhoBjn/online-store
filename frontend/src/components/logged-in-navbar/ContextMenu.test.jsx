import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ContextMenu from "./ContextMenu";

describe("The context menu", () => {
  it("should display an option to navigate to profile", () => {
    render(<ContextMenu />);

    expect(screen.getByTestId("go-to-profile")).toBeInTheDocument();
  });

  it("should display on option to log out", () => {
    render(<ContextMenu />);

    expect(screen.getByTestId("log-out")).toBeInTheDocument();
  });
});
