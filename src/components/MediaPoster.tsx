import {Box} from "@mui/material";
import {IMAGE_BASE_URL} from "../services/tmdbServices.ts";
import type {MovieDetails} from "@lorenzopant/tmdb";

interface MediaPosterProps {
    media: MovieDetails
}

export function MediaPoster({media}: MediaPosterProps){
    const poster = media.poster_path ? `${IMAGE_BASE_URL}${media.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original`; //TODO better no poster picture

    return (
        <Box component={"img"} src={poster} alt={media.title + "poster"}
             sx={{width: 400, borderRadius: 3}}/>
    )
}