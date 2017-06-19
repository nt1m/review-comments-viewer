function User({ name, avatar, time, review }) {
  return createElement("div", {
    className: "user",
  },
    createElement("img", {
      className: "user-avatar",
      src: avatar,
    }), 
    createElement("span", {
      className: "user-name",
    }, name + " "),
    createElement("span", {
      className: "user-action",
    }, review ? "reviewed on " : "commented on "),
    createElement("span", {
      className: "time",
    }, getFormattedTime(new Date(time)))
  );
}

function getFormattedTime(time) {
  const today = new Date(Date.now());
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ];
  let dateStr = months[time.getMonth()];
  dateStr += " " + time.getDate();
  if (today.getYear() !== time.getYear()) {
    dateStr += ", " + time.getYear();
  }
  dateStr += " at " + String(time.getHours()).padStart(2, "0") + ":" + String(time.getMinutes()).padStart(2, "0");
  return dateStr;
}