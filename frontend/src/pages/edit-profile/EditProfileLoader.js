import { redirect } from "react-router-dom";
import { getUser } from "../../utils/UsersAPI";

export const EditProfileLoader = async ({ params }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser?.token) {
    return redirect("/auth");
  }
  return getUser(params.id, currentUser.token);
};
