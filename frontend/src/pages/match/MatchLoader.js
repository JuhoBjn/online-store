import { redirect } from "react-router-dom";

export const MatchLoader = async () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  // Fetch all users and users added as friends.
  const [users, friends] = await Promise.all([
    fetch(`${import.meta.env.VITE_BACKEND_API}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.token}`
      }
    }),
    fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/users/${storedUser.id}/friends`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${storedUser.token}`
        }
      }
    )
  ]);
  const usersArray = await users.json();
  const friendsArray = await friends.json();

  // Create an array of all friend users ID's.
  const friendIds = friendsArray.map((friend) => {
    return friend.friend_user_id;
  });

  // Filter the all users array to remove friends leaving only users who are not friends yet.
  const matchUsers = usersArray.filter(
    (user) => !friendIds.includes(user.id) && user.id !== storedUser.id
  );

  return matchUsers;
};
