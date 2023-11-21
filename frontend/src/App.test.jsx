import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("main page", () => {
  it("should have News page", () => {
    render(<App />);
    expect(screen.getByText("News page")).toBeInTheDocument();
  });
});
