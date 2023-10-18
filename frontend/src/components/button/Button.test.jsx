import { render, screen } from "@testing-library/react";

import Button from "./Button";
import { expect, it } from "vitest";

describe("The button component", () => {
  it("should display a button component", () => {
    render(<Button />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
