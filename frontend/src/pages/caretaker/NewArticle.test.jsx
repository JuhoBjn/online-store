import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import NewArticle from "./NewArticle";

describe("The new article page", () => {
  it("should display a picture input", () => {
    render(
      <BrowserRouter>
        <NewArticle />
      </BrowserRouter>
    );

    expect(screen.getByTestId("article-picture-input")).toBeInTheDocument();
  });

  it("should display an input field for the article headline", () => {
    render(
      <BrowserRouter>
        <NewArticle />
      </BrowserRouter>
    );

    expect(screen.getByTestId("article-headline-input")).toBeInTheDocument();
  });

  it("should display an input field for the article body", () => {
    render(
      <BrowserRouter>
        <NewArticle />
      </BrowserRouter>
    );

    expect(screen.getByTestId("article-body-input")).toBeInTheDocument();
  });

  it("should display an input field for the article link", () => {
    render(
      <BrowserRouter>
        <NewArticle />
      </BrowserRouter>
    );

    expect(screen.getByTestId("article-link-input")).toBeInTheDocument();
  });

  it("should display a button to post the article", () => {
    render(
      <BrowserRouter>
        <NewArticle />
      </BrowserRouter>
    );

    expect(screen.getByTestId("post-article-button")).toBeInTheDocument();
  });
});
