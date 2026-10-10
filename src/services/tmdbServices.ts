import {TMDB} from "@lorenzopant/tmdb";

export const tmdb = new TMDB(import.meta.env.VITE_TMDB_BEARER_TOKEN!);
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function searchMulti(query: string) {
    return tmdb.search.multi({ query });
}

export function getTrendingMedia() {
    return tmdb.trending.all({time_window: "week"});
}