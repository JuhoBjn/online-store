import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeAll, expect, it } from "vitest";
import jwt from "jsonwebtoken";

import SetNewPasswordForm from "./SetNewPasswordForm";

describe("The set new password form", () => {
  const { sign } = jwt;
  let token;
  let expiredToken;

  beforeAll(() => {
    token = sign({ id: "65c29d76-c72f-417b-8637-406ce3291e42" }, "test-key", {
      expiresIn: "30m"
    });
    expiredToken = sign(
      {
        id: "65c29d76-c72f-417b-8637-406ce3291e42",
        // Set expiry 31 minutes in the past.
        exp: Math.floor(Date.now() / 1000) - 1860
      },
      "test-key"
    );
  });

  it("should display a title when the token is valid", () => {
    render(
      <BrowserRouter>
        <SetNewPasswordForm resetToken={token} />
      </BrowserRouter>
    );

    expect(screen.getByText("Set a new password")).toBeInTheDocument();
  });

  it("should display a field to enter new password when the token is valid", () => {
    render(
      <BrowserRouter>
        <SetNewPasswordForm resetToken={token} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  it("should display a submit button when the token is valid", () => {
    render(
      <BrowserRouter>
        <SetNewPasswordForm resetToken={token} />
      </BrowserRouter>
    );

    expect(screen.getByText("Set new password")).toBeInTheDocument();
  });

  it("should display error message when the token is expired", () => {
    render(
      <BrowserRouter>
        <SetNewPasswordForm resetToken={expiredToken} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("token-expiry-message")).toBeInTheDocument();
  });

  it("should display a button to request new password reset token when the token is expired", () => {
    render(
      <BrowserRouter>
        <SetNewPasswordForm resetToken={expiredToken} />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Request new token to reset password")
    ).toBeInTheDocument();
  });
});
