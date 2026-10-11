import {Box} from "@mui/material";
import type {MovieDetails} from "@lorenzopant/tmdb";
import {useGetMovieTrailer} from "../hooks/UseTMDBs.ts";

interface MediaTrailerProps {
    media: MovieDetails;
}

export function MediaTrailer({media}: MediaTrailerProps) {
    const {trailer} = useGetMovieTrailer(media.id);

    if (!trailer?.key) {
        return null;
    }

    return (
        <Box
            sx={{
                aspectRatio: "16 / 9",
                overflow: "hidden",
                borderRadius: 3,
            }}
        >
            <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${media.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sx={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                }}
            />
        </Box>
    )
}