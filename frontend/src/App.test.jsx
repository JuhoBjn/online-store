import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("main page", () => {
  it("should have Hello world", () => {
    render(<App />);
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });
});
