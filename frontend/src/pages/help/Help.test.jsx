import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Help from "./Help";

describe("The help page", () => {
  it("should display a header with a headline", () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );

    expect(screen.getByTestId("help-page-header")).toBeInTheDocument();
    expect(screen.getByTestId("help-page-title")).toBeInTheDocument();
  });

  it("should display an introduction text to the page", () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );

    expect(screen.getByTestId("help-page-introduction")).toBeInTheDocument();
  });

  it("should display a heading and ordered list for user assistance", () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("help-page-assist-you-heading")
    ).toBeInTheDocument();
    expect(screen.getByTestId("help-page-assist-you-list")).toBeInTheDocument();
    expect(
      screen.getByTestId("help-page-li-getting-started")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("help-page-li-account-support")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("help-page-li-event-registration")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("help-page-li-technical-support")
    ).toBeInTheDocument();
  });

  it("should display a FAQ section", () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );

    expect(screen.getByTestId("help-page-faq-heading")).toBeInTheDocument();
    expect(screen.getByTestId("help-page-faq-content")).toBeInTheDocument();
  });

  it("should display a feedback section", () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );

    expect(
      screen.getByTestId("help-page-feedback-heading")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("help-page-feedback-content")
    ).toBeInTheDocument();
  });

  it("should display footer with contact information", () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );

    expect(screen.getByTestId("help-page-footer")).toBeInTheDocument();
    expect(screen.getByTestId("help-page-footer-email")).toBeInTheDocument();
    expect(screen.getByTestId("help-page-footer-phone")).toBeInTheDocument();
    expect(screen.getByTestId("help-page-footer-address")).toBeInTheDocument();
  });
});
