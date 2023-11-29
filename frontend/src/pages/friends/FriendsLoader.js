import { redirect } from "react-router-dom";

import { getFriends } from "../../utils/FriendsAPI";

export const FriendsLoader = async () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  // Fetch all friends from the backend.
  const friends = await getFriends(storedUser.id, storedUser.token);
  // Filter out users that have been unfriended.
  const currentFriends = await friends.filter((f) => f.is_unfriended !== 1);

  return currentFriends;
};
