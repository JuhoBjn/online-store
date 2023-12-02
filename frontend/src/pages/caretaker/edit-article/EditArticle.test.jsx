import { render, screen } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditArticle from "./EditArticle";

const testRouter = createBrowserRouter([
  {
    path: "/",
    element: <EditArticle />,
    loader: () => {
      return {
        id: 1,
        headline: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
        body: "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.",
        picture_id: null,
        link: "https://example.com",
        created_at: "2023-12-02T21:41:47.000Z",
        updated_at: "2023-12-02T21:41:47.000Z",
        image_object_key: null,
        image_url: null
      };
    }
  }
]);

describe("The edit article page", () => {
  it("should display a title for the page", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("edit-article-page-header")).toBeInTheDocument();
    expect(screen.getByTestId("edit-article-page-title")).toBeInTheDocument();
  });

  it("should display an input to set the article heading", () => {
    render(<RouterProvider router={testRouter} />);

    expect(
      screen.getByTestId("edit-article-headline-input")
    ).toBeInTheDocument();
  });

  it("should display an input to set the article body", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("edit-article-body-input")).toBeInTheDocument();
  });

  it("should display an input to set the article link", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("edit-article-link-input")).toBeInTheDocument();
  });

  it("should display a button to delete the article", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("delete-article-button")).toBeInTheDocument();
  });

  it("should display a button to update article", () => {
    render(<RouterProvider router={testRouter} />);

    expect(screen.getByTestId("update-article-button")).toBeInTheDocument();
  });
});
