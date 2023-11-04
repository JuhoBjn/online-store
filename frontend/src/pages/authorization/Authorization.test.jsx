import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Authorization from "./Authorization";

describe("The login/signup page", () => {
  it("should display the service logo", () => {
    render(
      <BrowserRouter>
        <Authorization />
      </BrowserRouter>
    );

    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("should display a login/signup form", () => {
    render(
      <BrowserRouter>
        <Authorization />
      </BrowserRouter>
    );

    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("should display a button to switch between login and sign in mode", () => {
    render(
      <BrowserRouter>
        <Authorization />
      </BrowserRouter>
    );
    expect(screen.getByText("Sign up instead")).toBeInTheDocument();
  });
});
