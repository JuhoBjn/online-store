import { redirect } from "react-router-dom";

import { fetchAllNews } from "../../utils/NewsAPI";

export const NewsLoader = () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  return fetchAllNews(storedUser.token);
};
