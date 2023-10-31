import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "./Home";

describe("The home page", () => {
  it("should display hello world", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
});
