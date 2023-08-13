export const MAX_NUM_PODCASTS_TO_FETCH = 20;

export const EMPTY_PODCAST = {
  id: 0,
  title: "",
  authortName: "",
  date: "",
  img: "/grey.png",
};

export const SORT_TYPES = [
  { name: "No sort", value: "no_sort" },
  { name: "Title (A->Z)", value: "title" },
  { name: "Title (Z->A)", value: "title_inverse" },
  { name: "Released (new)", value: "released" },
  { name: "Released (old)", value: "released_inverse" },
];

export const NEW_FILTERS = {
  sort: "",
  word: "",
};

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
