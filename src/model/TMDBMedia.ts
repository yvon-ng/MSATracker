import type { CountryISO3166_1 } from "@lorenzopant/tmdb";

// TMDB Movies and Series
export interface TMDBMedia {
    backdrop_path?: string;
    id: number;
    media_type: "movie" | "tv" | "person";
    title?: string;
    original_title?: string;
    overview?: string;
    poster_path?: string;
    adult?: boolean;
    original_language?: string;
    genre_ids?: number[];
    popularity?: number;
    softcore?: boolean;
    release_date?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    name?: string;
    first_air_date?: string;
    origin_country?: CountryISO3166_1[];
    original_name?: string;
}