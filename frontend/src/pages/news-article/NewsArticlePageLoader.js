import { redirect } from "react-router-dom";

import { fetchArticle } from "../../utils/NewsAPI";

export const NewsArticlePageLoader = ({ params }) => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  return fetchArticle(params.id, storedUser.token);
};
