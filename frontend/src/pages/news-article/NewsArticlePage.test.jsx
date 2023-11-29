import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import NewsArticlePage from "./NewsArticlePage";

const testRouter = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      return {
        id: 1,
        headline: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        body: "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        picture_id: null,
        link: "https://example.com",
        created_at: "2023-11-29T20:46:38.000Z",
        updated_at: "2023-11-29T20:46:38.000Z",
        image_object_key: null,
        image_url: null
      };
    },
    element: <NewsArticlePage />
  }
]);

describe("The news article page", () => {
  it("should display an image", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("news-page-article-image")).toBeInTheDocument();
  });

  it("should display the article headline", () => {
    render(<RouterProvider router={testRouter} />);

    expect(
      screen.getByTestId("news-page-article-headline")
    ).toBeInTheDocument();
  });

  it("should display the date the article body", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("news-page-article-body")).toBeInTheDocument();
  });

  it("should display the article link", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("news-page-article-link")).toBeInTheDocument();
  });
});
