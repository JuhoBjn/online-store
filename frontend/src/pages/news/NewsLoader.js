import { redirect } from "react-router-dom";

import { fetchAllNews } from "../../utils/NewsAPI";
import { fetchUserEvents } from "../../utils/UsersAPI";

export const NewsLoader = async () => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!storedUser?.token) {
    return redirect("/frontpage");
  }

  const [news, userEvents] = await Promise.all([
    fetchAllNews(storedUser.token),
    fetchUserEvents(storedUser.id, storedUser.token)
  ]);

  let eventDates = [];
  if (userEvents) {
    eventDates = userEvents.map((event) => {
      return {
        eventId: event.id,
        title: event.name,
        display: "block",
        start: event.starts_at,
        end: event.ends_at
      };
    });
  }

  return { news, eventDates };
};
