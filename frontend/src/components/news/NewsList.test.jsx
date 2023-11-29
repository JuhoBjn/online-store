import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import NewsList from "./NewsList";

describe("The news list component", () => {
  const testArticles = [
    {
      id: 1,
      headline: "BREAKING NEWS: The first test article has been posted",
      body: "The first article to display in this component has finally been released.",
      imageUrl: null,
      link: "https://example.com"
    },
    {
      id: 2,
      headline: "The second test article has been posted",
      body: "The second article to display in this component has just been released.",
      imageUrl: null,
      link: "https://example.com"
    }
  ];

  it("should display a container element for the list", () => {
    render(
      <BrowserRouter>
        <NewsList articles={testArticles} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("news-list-container")).toBeInTheDocument();
  });

  it("should display an unordered list of articles", () => {
    render(
      <BrowserRouter>
        <NewsList articles={testArticles} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("news-list")).toBeInTheDocument();
  });

  it("should display news list items when provided articles", () => {
    render(
      <BrowserRouter>
        <NewsList articles={testArticles} />
      </BrowserRouter>
    );

    expect(screen.getAllByTestId("news-list-item").length).toBeGreaterThan(0);
  });

  it("should a message if no articles are provided", () => {
    render(
      <BrowserRouter>
        <NewsList />
      </BrowserRouter>
    );

    expect(screen.getByTestId("no-articles-found")).toBeInTheDocument();
    expect(screen.queryAllByTestId("news-list-item").length).toBe(0);
  });
});
