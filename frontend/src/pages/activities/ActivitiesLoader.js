import { redirect } from "react-router-dom";

export const ActivitiesLoader = () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!storedUser?.token) {
    return redirect("/frontpage");
  }
  return true;
};
