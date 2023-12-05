import { redirect } from "react-router-dom";

import { fetchSingleActivity } from "../../utils/ActivityAPI";

import ElatedPensioner from "../../assets/Elated_pensioner.jpg";

export const ActivityLoader = async ({ params }) => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  const activity = await fetchSingleActivity(
    params.activityId,
    storedUser.token
  );
  activity.image_url = ElatedPensioner;
  return activity;
};
