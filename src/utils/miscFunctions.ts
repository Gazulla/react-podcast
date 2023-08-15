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

export const formatDuration = (duration: any) => {
  let formatedDuration = "00:00";
  if (duration.length === 8 && duration.substring(0, 2) === "00") {
    formatedDuration = duration.substring(3, 8);
  } else if (duration.length === 8 && duration.substring(0, 2) !== "00") {
    const hours = Number(duration.substring(0, 2));
    const minutes = hours * 60;
    const previousMinutes = Number(duration.substring(3, 5));
    const totalMinutes = minutes + previousMinutes;
    formatedDuration = `${totalMinutes}:${duration.substring(6, 8)}`;
  } else if (duration.length === 5) {
    formatedDuration = duration;
  }
  return formatedDuration;
};

export const dC = (o: Object) => {
  return JSON.parse(JSON.stringify(o));
};

export const formatTime = (time: any) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return formatDuration(time);
};
