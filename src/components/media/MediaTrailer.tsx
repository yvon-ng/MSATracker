
import { Box } from "@mui/material";
import type { MovieDetails, TVSeriesDetails } from "@lorenzopant/tmdb";
import { useGetMovieTrailer, useGetSeriesTrailer } from "../../hooks/UseTMDBs.ts";

interface MediaTrailerProps {
    media: MovieDetails | TVSeriesDetails;
    isMovie: boolean;
}

export function MediaTrailer({ media, isMovie }: MediaTrailerProps) {
    if (isMovie) {
        return <MovieTrailer media={media as MovieDetails} />;
    }

    return <SeriesTrailer media={media as TVSeriesDetails} />;
}

function MovieTrailer({ media }: { media: MovieDetails }) {
    const { trailer } = useGetMovieTrailer(media.id);
    return <TrailerFrame title={media.title} trailerKey={trailer?.key} />;
}

function SeriesTrailer({ media }: { media: TVSeriesDetails }) {
    const { trailer } = useGetSeriesTrailer(media.id);
    return <TrailerFrame title={media.name} trailerKey={trailer?.key} />;
}

function TrailerFrame({title, trailerKey,}: { title: string; trailerKey?: string; }) {
    if (!trailerKey) return null;

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
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`${title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sx={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    border: 0,
                }}
            />
        </Box>
    );
}
