import { redirect } from "react-router-dom";
import { getUser } from "../../utils/UsersAPI";

export const UserProfileLoader = async ({ params }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser?.token) {
    return redirect("/frontpage");
  }
  return getUser(params.id, currentUser.token);
};
