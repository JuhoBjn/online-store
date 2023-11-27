import { redirect } from "react-router-dom";

import { getReceivedFriendRequests } from "../../utils/FriendsAPI";

export const FriendRequestsLoader = async () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  // Fetch all friend requests for the user.
  const friendRequests = await getReceivedFriendRequests(
    storedUser.id,
    storedUser.token
  );

  // Filter out friend requests that have been either accepted
  // or denied.
  const activeFriendRequests = await friendRequests.filter(
    (fr) => fr.is_accepted !== 1 && fr.is_rejected !== 1
  );

  return activeFriendRequests;
};
