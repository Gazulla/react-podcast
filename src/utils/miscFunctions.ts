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
