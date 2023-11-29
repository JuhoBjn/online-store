import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Frontpage from "./Frontpage";

describe("The frontpage", () => {
  it("should display a heading", () => {
    render(
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("frontpage-title")).toBeInTheDocument();
  });

  it("should display a banner image", () => {
    render(
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("frontpage-banner-image")).toBeInTheDocument();
  });

  it("should display text content", () => {
    render(
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("frontpage-content")).toBeInTheDocument();
  });

  it("should display pricing info", () => {
    render(
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("frontpage-content-pricing")).toBeInTheDocument();
  });

  it("should display a button to join the platform", () => {
    render(
      <BrowserRouter>
        <Frontpage />
      </BrowserRouter>
    );

    expect(screen.getByText("Join")).toBeInTheDocument();
  });
});
