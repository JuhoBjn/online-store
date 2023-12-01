import { redirect } from "react-router-dom";

import { getFriends } from "../../utils/FriendsAPI";

export const FriendsLoader = async ({ keepUnfriended = false }) => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  // Fetch all friends from the backend.
  const friends = await getFriends(storedUser.id, storedUser.token);
  if (!friends) {
    console.log("Error fetching friends");
  }
  if (keepUnfriended) {
    return friends;
  } else {
    // Filter out users that have been unfriended.
    return await friends.filter((f) => f.is_unfriended !== 1);
  }
};
