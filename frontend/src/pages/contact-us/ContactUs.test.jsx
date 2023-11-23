import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ContactUs from "./ContactUs";

describe("The contact us page", () => {
  it("should display heading", () => {
    render(
      <BrowserRouter>
        <ContactUs />
      </BrowserRouter>
    );

    expect(screen.getByTestId("contact-form-title")).toBeInTheDocument();
  });

  it("should display an input for email", () => {
    render(
      <BrowserRouter>
        <ContactUs />
      </BrowserRouter>
    );

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
  });

  it("should display input for message", () => {
    render(
      <BrowserRouter>
        <ContactUs />
      </BrowserRouter>
    );

    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("should display a button to send the message", () => {
    render(
      <BrowserRouter>
        <ContactUs />
      </BrowserRouter>
    );

    expect(screen.getByText("Send message")).toBeInTheDocument();
  });
});
