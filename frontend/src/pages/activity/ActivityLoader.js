import { redirect } from "react-router-dom";

import { fetchSingleActivity } from "../../utils/ActivityAPI";

export const ActivityLoader = async ({ params }) => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  return await fetchSingleActivity(params.activityId, storedUser.token);
};
