import {
  CORS_PROXY,
  EMPTY_PODCAST,
  EMPTY_TRACK,
  MAX_NUM_PODCASTS_TO_FETCH,
} from "../constants/appConstants";
import { IPodcast, IPodcastTrack } from "../types";
import { dC, removeCDATA } from "../utils/miscFunctions";

export function getTrackRssInfo(trackRaw: any) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(trackRaw, "text/html");
  let trackRssInfo: IPodcastTrack = dC(EMPTY_TRACK);
  trackRssInfo.id = xmlDoc?.getElementsByTagName("guid")[0]?.innerHTML || "";
  trackRssInfo.authorName =
    xmlDoc?.getElementsByTagName("author")[0]?.innerHTML ||
    xmlDoc?.getElementsByTagName("itunes:author")[0]?.innerHTML ||
    "";
  trackRssInfo.date = xmlDoc?.getElementsByTagName("pubDate")[0]?.innerHTML || "";
  trackRssInfo.duration = xmlDoc?.getElementsByTagName("itunes:duration")[0]?.innerHTML || "";
  trackRssInfo.audio = xmlDoc?.getElementsByTagName("enclosure")[0]?.getAttribute("url") || "";
  trackRssInfo.img = xmlDoc?.getElementsByTagName("itunes:image")[0]?.getAttribute("href") || "";
  trackRssInfo.title = removeCDATA(xmlDoc?.getElementsByTagName("title")[0]?.innerHTML || "");
  trackRssInfo.description = removeCDATA(
    xmlDoc?.getElementsByTagName("description")[0]?.innerHTML || ""
  );
  return trackRssInfo;
}

export async function getPodcastRssItems({ feedUrl }: { feedUrl: string }) {
  try {
    const res = await fetch(CORS_PROXY + feedUrl);
    if (res.ok) {
      const data = await res.text();
      return data;
    }
  } catch (error: any) {
    throw new Error("Error fetching Podcast RSS Info. Error: " + error.message);
  }
}

export async function getPodcastRssInfo({ feedUrl }: { feedUrl: string }) {
  const data = await getPodcastRssItems({ feedUrl });
  let podcastRssInfo: IPodcast = dC(EMPTY_PODCAST);
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data!, "text/xml");
  const items = xmlDoc?.getElementsByTagName("item");
  let tracks = [];
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const newTrck = getTrackRssInfo(item.innerHTML);
      tracks.push(structuredClone(newTrck));
    }
  }
  podcastRssInfo.title = xmlDoc?.getElementsByTagName("title")[0]?.outerHTML || "";
  podcastRssInfo.authorName = xmlDoc?.getElementsByTagName("itunes:author")[0]?.innerHTML || "";
  podcastRssInfo.description = xmlDoc?.getElementsByTagName("description")[0]?.innerHTML || "";
  podcastRssInfo.imgBig =
    xmlDoc?.getElementsByTagName("itunes:image")[0]?.getAttribute("href") || "";
  podcastRssInfo.tracks = [...tracks];
  return podcastRssInfo;
}

const mapPodcast = async (podcastRaw: any) => {
  const rssinfo = await getPodcastRssInfo({ feedUrl: podcastRaw.feedUrl });
  const finalPodcast = {
    id: podcastRaw.trackId || "0",
    title: podcastRaw.trackName,
    authorName: podcastRaw.artistName,
    date: podcastRaw.releaseDate,
    imgSmall:
      podcastRaw.artworkUrl100 ||
      podcastRaw.artworkUrl60 ||
      podcastRaw.artworkUrl30 ||
      podcastRaw.artworkUrl600,
    imgBig: rssinfo.imgBig,
    feedUrl: podcastRaw.feedUrl,
    description: removeCDATA(rssinfo.description),
    tracks: rssinfo.tracks,
  };
  return finalPodcast;
};

export async function getPodcastsBySearch({ search }: { search: any }) {
  try {
    const res = await fetch(
      //`${CORS_PROXY}https://itunes.apple.com/search?term=${search}&limit=${MAX_NUM_PODCASTS_TO_FETCH}&media=podcast&entity=podcast`
      `https://itunes.apple.com/search?term=${search}&limit=${MAX_NUM_PODCASTS_TO_FETCH}&media=podcast&entity=podcast`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const proms = await data.results.map((podcastRaw: any) => mapPodcast(podcastRaw));
        const fetchedPodcasts = await Promise.all(proms);
        return fetchedPodcasts.filter((p) => p.tracks.length > 0);
      }
    }
    return [];
  } catch (error: any) {
    throw new Error("Error fetching Podcasts from the API. Error: " + error.message);
  }
}

export async function getPodcastById({ id }: { id: string }) {
  try {
    const res = await fetch(
      `${CORS_PROXY}https://itunes.apple.com/lookup?id=${id}`
      //`https://itunes.apple.com/lookup?id=${id}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return mapPodcast(data.results[0]);
      }
    }
    return dC(EMPTY_PODCAST);
  } catch (error: any) {
    throw new Error("Error fetching Podcasts from the API. Error: " + error.message);
  }
}
