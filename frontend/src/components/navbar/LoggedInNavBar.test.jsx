import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoggedInNavBar from "./LoggedInNavBar";
import News from "../../pages/news/News";
import Activities from "../../pages/activities/Activities";
import Messages from "../../pages/messages/Messages";
import Match from "../../pages/match/Match";
import Help from "../../pages/help/Help";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LoggedInNavBar />
        <News />
      </>
    )
  },
  {
    path: "/activities",
    element: (
      <>
        <LoggedInNavBar />
        <Activities />
      </>
    )
  },
  {
    path: "/match",
    element: (
      <>
        <LoggedInNavBar />
        <Match />
      </>
    )
  },
  {
    path: "/messages",
    element: (
      <>
        <LoggedInNavBar />
        <Messages />
      </>
    )
  },
  {
    path: "/help",
    element: (
      <>
        <LoggedInNavBar />
        <Help />
      </>
    )
  }
]);

describe("The logged in navbar", () => {
  it("should display Goldenage logo", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("goldenage-logo")).toBeInTheDocument();
  });

  it("should display a link to the news page", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("news-page-link")).toBeInTheDocument();
  });
  it("should display a link to the activities page", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("activities-page-link")).toBeInTheDocument();
  });
  it("should display a link to the match page", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("match-page-link")).toBeInTheDocument();
  });
  it("should display a link to the messages page", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("messages-page-link")).toBeInTheDocument();
  });
  it("should display a link to the help page", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("help-page-link")).toBeInTheDocument();
  });
});
