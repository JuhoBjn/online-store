import { redirect } from "react-router-dom";

import { fetchAllNews } from "../../../utils/NewsAPI";

export const MyArticlesLoader = () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  return fetchAllNews(storedUser.token);
};
