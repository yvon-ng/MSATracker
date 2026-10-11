import {Box} from "@mui/material";
import {IMAGE_BASE_URL} from "../../services/tmdbServices.ts";
import type {MovieDetails, TVSeriesDetails} from "@lorenzopant/tmdb";

interface MediaPosterProps {
    media: MovieDetails | TVSeriesDetails
    isMovie: boolean
}

const NO_POSTER_URL = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

export function MediaPoster({media, isMovie}: MediaPosterProps) {
    const poster = media.poster_path ? `${IMAGE_BASE_URL}${media.poster_path}` : NO_POSTER_URL;
    const title = isMovie ? (media as MovieDetails).title : (media as TVSeriesDetails).name;
    return <Box component={"img"} src={poster} alt={title + "poster"} sx={{width: 400, borderRadius: 3}}/>
}