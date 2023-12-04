import { redirect } from "react-router-dom";

import { fetchUserEvents } from "../../utils/UsersAPI";

export const NewsLoader = async () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  const [news, userEvents] = await Promise.all([
    fetch(`${import.meta.env.VITE_BACKEND_API}/api/news`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedUser.token}`,
        Accept: "application/json"
      }
    }),
    fetchUserEvents(storedUser.id, storedUser.token)
  ]);

  const eventDates = userEvents.map((event) => {
    return {
      eventId: event.id,
      title: event.name,
      display: "block",
      start: event.starts_at,
      end: event.ends_at
    };
  });

  return { news, eventDates };
};
