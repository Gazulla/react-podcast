import { EMPTY_PODCAST, MAX_NUM_PODCASTS_TO_FETCH } from "../constants/appConstants";

const mapPodcast = (podcastRaw) => {
  return {
    id: podcastRaw.trackId,
    title: podcastRaw.trackName,
    authortName: podcastRaw.artistName,
    date: podcastRaw.releaseDate,
    img:
      podcastRaw.artworkUrl100 ||
      podcastRaw.artworkUrl60 ||
      podcastRaw.artworkUrl30 ||
      podcastRaw.artworkUrl600,
  };
};

export async function getPodcastsBySearch({ search }) {
  try {
    const res = await fetch(
      //`https://api.allorigins.win/raw?url=https://itunes.apple.com/search?term=${search}&limit=${MAX_NUM_PODCASTS_TO_FETCH}&media=podcast&entity=podcast`
      `https://itunes.apple.com/search?term=${search}&limit=${MAX_NUM_PODCASTS_TO_FETCH}&media=podcast&entity=podcast`
    );
    const data = await res.json();
    const newPodcasts = data.results.map((podcastRaw) => mapPodcast(podcastRaw));
    return newPodcasts;
  } catch (error) {
    throw new Error("Error fetching Podcasts from the API. Error: " + error.message);
  }
}

export async function getPodcastById({ id }) {
  try {
    const res = await fetch(
      `https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id=${id}`
      //`https://itunes.apple.com/lookup?id=${id}`
    );
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return mapPodcast(data.results[0]);
    } else {
      return EMPTY_PODCAST;
    }
  } catch (error) {
    throw new Error("Error fetching Podcasts from the API. Error: " + error.message);
  }
}
