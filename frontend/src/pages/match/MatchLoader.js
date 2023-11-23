import { redirect } from "react-router-dom";

export const MatchLoader = () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!storedUser?.token) {
    return redirect("/frontpage");
  }
  return true;
};