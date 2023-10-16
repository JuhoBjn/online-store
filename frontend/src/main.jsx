import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import App from "./App.jsx";
import Authorization from "./pages/authorization/Authorization";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/auth",
    element: <Authorization />
  },
  {
    path: "*",
    element: <Navigate to="/" replace="true" />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
