import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import CaretakerSidebar from "./CaretakerSidebar";

describe("The caretaker sidebar", () => {
  it("should display a container element for the sidebar", () => {
    render(
      <BrowserRouter>
        <CaretakerSidebar />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("caretaker-sidebar-container")
    ).toBeInTheDocument();
  });
  it("should display a button to create a new article", () => {
    render(
      <BrowserRouter>
        <CaretakerSidebar />
      </BrowserRouter>
    );

    expect(screen.getByTestId("new-article-button")).toBeInTheDocument();
  });
});
