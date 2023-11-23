import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "./Home";
describe("main page", () => {
  it("should have What is GoldenAge?", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(window.location.pathname).toBe('/frontpage')
  });
});