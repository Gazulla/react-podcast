import { DAYS_OF_WEEK, MONTHS } from "../constants/appConstants";

export const getDate = (fullDate: string) => {
  const now = new Date(Date.now());
  const releasedDate = new Date(fullDate);
  const difference = now.getTime() - releasedDate.getTime();
  let stringDate =
    difference < 60 * 60 * 1000
      ? "An our ago"
      : difference < 24 * 60 * 60 * 1000 && now.getDate() === releasedDate.getDate()
      ? "Today"
      : difference < 7 * 24 * 60 * 60 * 1000
      ? "Last " + DAYS_OF_WEEK[releasedDate.getDay()]
      : releasedDate.getFullYear() === now.getFullYear()
      ? releasedDate.getDate() + "/" + MONTHS[releasedDate.getMonth()]
      : releasedDate.getDate() +
        "/" +
        (releasedDate.getMonth() + 1) +
        "/" +
        releasedDate.getFullYear();
  return stringDate;
};

export const removeCDATA = (str: string) => {
  var div = document.createElement("div");
  div.innerHTML = str.trim();
  return div.innerText
    .replace("<![CDATA[", "")
    .replace("]]>", "")
    .replace("&lt;![CDATA[", "")
    .replace("]]&gt;", "")
    .replace("<!--[CDATA[", "")
    .replace("]]-->;", "")
    .replace("<p-->", "")
    .replace("<--/p>", "")
    .replace("<p>", "")
    .replace("</p>", "")
    .replace("<a>", "")
    .replace("</a>", "")
    .replace("<em>", "")
    .replace("&lt;", "")
    .replace("&gt;", "")
    .replace("</em>", "");
};

export const formatDuration = (duration: string) => {
  let formatedDuration =
    duration.length > 5 && duration.substring(0, 2) === "00"
      ? duration.substring(3, 5) + " min"
      : duration.length > 5 && duration.substring(0, 2) !== "00"
      ? duration.substring(0, 5) + " h"
      : duration.substring(3, 5) + " min";
  return formatedDuration;
};

export const dC = (o: Object) => {
  return JSON.parse(JSON.stringify(o));
};

export const formatTime = (time: number) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return "00:00";
};
