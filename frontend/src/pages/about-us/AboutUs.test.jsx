import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import AboutUs from "./AboutUs";

describe("The about us page", () => {
  it("should display text content", () => {
    render(
      <BrowserRouter>
        <AboutUs />
      </BrowserRouter>
    );

    expect(screen.getByTestId("about-us-paragraph1")).toBeInTheDocument();
    expect(screen.getByTestId("about-us-paragraph2")).toBeInTheDocument();
  });
  it("should display and image next to the text content", () => {
    render(
      <BrowserRouter>
        <AboutUs />
      </BrowserRouter>
    );

    expect(screen.getByTestId("about-us-image")).toBeInTheDocument();
  });
});
