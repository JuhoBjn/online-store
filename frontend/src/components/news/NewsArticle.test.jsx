import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import NewsArticle from "./NewsArticle";
import ElatedPensioner from "../../assets/Elated_pensioner.jpg";

describe("The news article component", () => {
  const testArticle = {
    id: 1,
    headline: "BREAKING NEWS: The first test article has been posted",
    body: "The first article to display in this component has finally been released.",
    imageUrl: ElatedPensioner,
    link: "https://example.com"
  };

  it("should display an article container", () => {
    render(
      <BrowserRouter>
        <NewsArticle
          id={testArticle.id}
          headline={testArticle.headline}
          body={testArticle.body}
          link={testArticle.link}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("news-article-container")).toBeInTheDocument();
  });

  it("should display an image", () => {
    render(
      <BrowserRouter>
        <NewsArticle
          id={testArticle.id}
          headline={testArticle.headline}
          body={testArticle.body}
          link={testArticle.link}
          imageUrl={testArticle.imageUrl}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("news-article-image")).toBeInTheDocument();
  });

  it("should display a headline", () => {
    render(
      <BrowserRouter>
        <NewsArticle
          id={testArticle.id}
          headline={testArticle.headline}
          body={testArticle.body}
          link={testArticle.link}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("news-article-headline")).toBeInTheDocument();
  });

  it("should display the article body", () => {
    render(
      <BrowserRouter>
        <NewsArticle
          id={testArticle.id}
          headline={testArticle.headline}
          body={testArticle.body}
          link={testArticle.link}
        />
      </BrowserRouter>
    );

    expect(screen.getByTestId("news-article-body")).toBeInTheDocument();
  });
});
