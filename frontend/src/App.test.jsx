import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("main page", () => {
  it("should have What is Goldenage?", () => {
    render(<App />);
    expect(screen.getByText("What is GoldenAge?")).toBeInTheDocument();
  });
});
