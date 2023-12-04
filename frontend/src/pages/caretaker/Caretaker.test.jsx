import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Caretaker from "./Caretaker";

describe("The caretaker page", () => {
  it("should display an outlet for child routes", () => {
    render(
      <BrowserRouter>
        <Caretaker />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("caretaker-page-child-route-container")
    ).toBeInTheDocument();
  });
});
