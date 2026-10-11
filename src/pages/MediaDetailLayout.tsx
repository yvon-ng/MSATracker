import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import {MediaPoster} from "../components/MediaPoster.tsx";
import {MediaInfo} from "../components/MediaInfo.tsx";
import {MediaTrailer} from "../components/MediaTrailer.tsx";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import type {MovieDetails, TVSeriesDetails} from "@lorenzopant/tmdb";
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

interface MediaDetailLayoutProps {
    media: MovieDetails | TVSeriesDetails;
    isMovie: boolean;
}

export function MediaDetailLayout({media, isMovie}: MediaDetailLayoutProps) {
    const normalizedScore = Math.min(10, Math.max(0, media.vote_average));
    // TODO NEEDED?
    // const backdrop = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original`;

    return (
        <Box mt={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
            <Stack direction={"row"}>
                <Stack direction={"row"} gap={4} width={"60%"}>
                    <MediaPoster media={media} isMovie={isMovie}/>

                    {/*MOVIE: title, tagline, release year, duration, overview, SERIE: title, tagline, air years, seasons, ep duration, overview*/}
                    <MediaInfo media={media} isMovie={isMovie}/>

                    {/*TODO*/}
                    {/*<Typography variant={"subtitle1"} fontWeight={"400"}*/}
                    {/*            color={"textSecondary"}>{movie.original_language}</Typography>*/}
                    {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.genres}</Typography>*!/*/}
                    {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.belongs_to_collection}</Typography>*!/*/}
                    {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.production_companies}</Typography>*!/*/}
                    {/*<Box component={"img"} src={backdrop} alt={movie.title + "backdrop"} sx={{width: 400, borderRadius: 3}}/>*/}
                </Stack>

                <Stack
                    width="40%"
                    sx={{mx: 10}}
                    spacing={1}
                    alignItems="stretch"
                >
                    <MediaTrailer media={media} isMovie={isMovie}/>

                    {/* media stats */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" px={3} py={2}
                           borderRadius={5} sx={{bgcolor: "background.paper"}}>

                        {isMovie && (
                            <>
                                {/* Budget */}
                                <Stack alignItems="center">
                                    <LocalAtmOutlinedIcon sx={{color: "text.secondary"}}/>
                                    <Typography variant="h6">
                                        {(media as MovieDetails).budget > 0
                                            ? `${((media as MovieDetails).budget / 1_000_000).toFixed(1)} M`
                                            : "N/A"}
                                    </Typography>
                                </Stack>

                                {/* Revenue */}
                                <Stack alignItems="center">
                                    <PaidOutlinedIcon sx={{color: "text.secondary"}}/>
                                    <Typography variant="h6">
                                        {(media as MovieDetails).revenue > 0
                                            ? `${((media as MovieDetails).revenue / 1_000_000).toFixed(1)} M`
                                            : "N/A"}
                                    </Typography>
                                </Stack>
                            </>
                        )}

                        {!isMovie && (
                            <>
                                {/* Budget */}
                                <Stack alignItems="center">
                                    <EventRepeatOutlinedIcon sx={{color: "text.secondary"}}/>
                                    <Typography variant="h6">
                                        {(media as MovieDetails).status}
                                    </Typography>
                                </Stack>
                            </>
                        )}

                        {/* Vote count */}
                        <Stack alignItems="center">
                            <HowToVoteOutlinedIcon sx={{color: "text.secondary"}}/>
                            <Stack direction={"row"} gap={0.3} alignItems={"center"} justifyContent={"center"}>
                                <Typography variant="h6">
                                    {media.vote_count}
                                </Typography>
                                <PersonOutlinedIcon/>
                            </Stack>
                        </Stack>

                        <Box
                            sx={{
                                position: "relative",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress
                                variant="determinate"
                                value={normalizedScore ? normalizedScore * 10 : 100}
                                size={72}
                                thickness={4}
                                sx={{
                                    color: normalizedScore >= 7 ? "success.main" : normalizedScore >= 5 ? "warning.main" : "error.main",
                                }}
                            />

                            <Box sx={{
                                position: "absolute",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                                <Typography variant="h6" fontWeight={600}>{normalizedScore.toFixed(1)}</Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}