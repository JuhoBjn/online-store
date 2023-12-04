/**
 * Formats a given date into a string representation of time.
 * If the date is less than 24 hours ago, it will return only the time. Otherwise, it will return the date and time.
 * @param {Date|string} inputDate - The input date, either a Date object or a ISO 8601 string.
 * @returns {string} The formatted time string.
 */
const formatTime = (inputDate) => {
  const date = new Date(inputDate);
  const now = new Date();
  const diffInHours = Math.abs(now - date) / 36e5; // 36e5 is the scientific notation for 3600000, which is the number of milliseconds in one hour

  let formattedTime;
  if (diffInHours < 24) {
    formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  } else {
    formattedTime =
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return formattedTime;
};

export default formatTime;
