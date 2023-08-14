export const MAX_NUM_PODCASTS_TO_FETCH = 10;
export const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export const EMPTY_PODCAST = {
  id: "0",
  title: "",
  authorName: "",
  date: "",
  imgSmall: "/grey.png",
  imgBig: "/grey.png",
  feedUrl: "",
  description: "",
  audioUrl: "",
  tracks: [],
};

export const EMPTY_TRACK = {
  id: "0",
  title: "",
  date: "",
  img: "/grey.png",
  audio: "",
  duration: "",
  authorName: "",
  description: "",
};

export const SORT_TYPES = [
  { name: "No sort", value: "no_sort" },
  { name: "Title (A->Z)", value: "title" },
  { name: "Title (Z->A)", value: "title_inverse" },
  { name: "Released (new)", value: "released" },
  { name: "Released (old)", value: "released_inverse" },
];

export const NEW_FILTERS = {
  sort: "released",
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
