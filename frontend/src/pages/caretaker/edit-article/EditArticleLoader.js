import { redirect } from "react-router-dom";

import { fetchArticle } from "../../../utils/NewsAPI";

export const EditArticleLoader = async ({ params }) => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  return await fetchArticle(params.id, storedUser.token);
};
