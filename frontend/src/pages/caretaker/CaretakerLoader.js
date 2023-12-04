import { redirect } from "react-router-dom";

export const CaretakerLoader = () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  const allowedRoles = ["caretaker", "admin"];
  if (!storedUser?.token || !allowedRoles.includes(storedUser?.role)) {
    return redirect("/frontpage");
  }

  return true;
};
