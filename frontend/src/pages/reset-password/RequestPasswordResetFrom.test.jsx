import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import RequestPasswordResetForm from "./RequestPasswordResetForm";

describe("The request password reset form", () => {
  it("should display a title", () => {
    render(
      <BrowserRouter>
        <RequestPasswordResetForm />
      </BrowserRouter>
    );

    expect(screen.getByText("Request password reset")).toBeInTheDocument();
  });

  it("should display a form with email field", () => {
    render(
      <BrowserRouter>
        <RequestPasswordResetForm />
      </BrowserRouter>
    );

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
  });

  it("should display a submit button", () => {
    render(
      <BrowserRouter>
        <RequestPasswordResetForm />
      </BrowserRouter>
    );

    expect(screen.getByText("Send password reset email")).toBeInTheDocument();
  });
});
