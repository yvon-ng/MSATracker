import {TMDB} from "@lorenzopant/tmdb";

export const tmdb = new TMDB(import.meta.env.VITE_TMDB_BEARER_TOKEN!);
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function searchMulti(query: string) {
    return await tmdb.search.multi({ query });
}

export async function getTrendingMedia() {
    return await tmdb.trending.all({time_window: "week"});
}

export async function getMovie(movieId: number) {
    return await tmdb.movies.details({ movie_id: movieId });
}

export async function getMovieTrailer(movieId: number) {
    const videos = await tmdb.movies.videos({ movie_id: movieId })
    return videos.results.find((v) => v.type === "Trailer");
}