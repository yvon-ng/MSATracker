import {Box, Stack} from "@mui/material";
import {MediaPoster} from "./MediaPoster.tsx";
import {MediaInfo} from "./MediaInfo.tsx";
import {MediaTrailer} from "./MediaTrailer.tsx";
import {type MovieDetails, type TVSeriesDetails} from "@lorenzopant/tmdb";
import {MediaStats} from "./MediaStats.tsx";
import {IMAGE_BASE_URL} from "../../services/tmdbServices.ts";
import {useState} from "react";

type MediaDetailLayoutProps =
    | { media: MovieDetails; isMovie: true }
    | { media: TVSeriesDetails; isMovie: false }; //doesnt allow media: movie + isMovie = false and media: series = true

export function MediaDetailLayout({media, isMovie}: MediaDetailLayoutProps) {
    //TODO should come from db
    const [showMediaBackdrop, setShowMediaBackdrop] = useState(true);
    const backdrop = media.backdrop_path ? `${IMAGE_BASE_URL}${media.backdrop_path}` : undefined;

    return (
        <Box
            sx={{
                position: "relative",
                isolation: "isolate",
                overflow: "hidden",
                ...(showMediaBackdrop && backdrop && {
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: -10,
                        backgroundImage: `url("${backdrop}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(100px)",
                        zIndex: -1,
                    },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(18, 18, 18, 0.65)",
                    zIndex: -1,
                },
                })
            }}
        >
            <Box my={10} ml={{xs: 0, md: 8}} mr={{xs: 5, md: 8, lg: 0}}>
                <Stack direction={{xs: "column", lg: "row"}}>
                    <Stack direction={{xs: "column", md: "row"}} gap={4} width={{lg: "60%"}}>
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

                    <Stack width={{xs: "100%", lg: "40%"}} mt={{xs: 5, lg: 0}} mx={{lg: 10}} spacing={1}
                           alignItems="stretch">
                        <MediaTrailer media={media} isMovie={isMovie}/>
                        {/*MOVIE: budget, revenue, vote amount, vote avg; SERIE: series status, vote amount, vote avg*/}
                        <MediaStats media={media} isMovie={isMovie}/>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}