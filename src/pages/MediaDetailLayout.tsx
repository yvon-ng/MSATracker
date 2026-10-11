import {Box, Stack} from "@mui/material";
import {MediaPoster} from "../components/MediaPoster.tsx";
import {MediaInfo} from "../components/MediaInfo.tsx";
import {MediaTrailer} from "../components/MediaTrailer.tsx";
import type {MovieDetails, TVSeriesDetails} from "@lorenzopant/tmdb";
import { MediaStats } from "../components/MediaStats.tsx";

interface MediaDetailLayoutProps {
    media: MovieDetails | TVSeriesDetails;
    isMovie: boolean;
}

export function MediaDetailLayout({media, isMovie}: MediaDetailLayoutProps) {
    // TODO NEEDED?
    // const backdrop = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original`;

    return (
        <Box mt={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
            <Stack direction={"row"}>
                <Stack direction={"row"} gap={4} width={"60%"}>
                    <MediaPoster media={media} isMovie={isMovie}/>

                    {/*MOVIE: title, tagline, release year, duration, overview; SERIE: title, tagline, air years, seasons, ep duration, overview*/}
                    <MediaInfo media={media} isMovie={isMovie}/>

                    {/*TODO*/}
                    {/*<Typography variant={"subtitle1"} fontWeight={"400"}*/}
                    {/*            color={"textSecondary"}>{movie.original_language}</Typography>*/}
                    {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.genres}</Typography>*!/*/}
                    {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.belongs_to_collection}</Typography>*!/*/}
                    {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.production_companies}</Typography>*!/*/}
                    {/*<Box component={"img"} src={backdrop} alt={movie.title + "backdrop"} sx={{width: 400, borderRadius: 3}}/>*/}
                </Stack>

                <Stack width="40%" sx={{mx: 10}} spacing={1} alignItems="stretch">
                    <MediaTrailer media={media} isMovie={isMovie}/>
                    {/*MOVIE: budget, revenue, vote amount, vote avg; SERIE: series status, vote amount, vote avg*/}
                    <MediaStats media={media} isMovie={isMovie}/>
                </Stack>
            </Stack>
        </Box>
    )
}