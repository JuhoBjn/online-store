import { redirect } from "react-router-dom";

import { fetchAllActivities } from "../../../utils/ActivityAPI";

export const CreatedActivitiesLoader = async () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  return await fetchAllActivities(storedUser.token);
};
