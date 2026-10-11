import {Box, Stack, Typography, CircularProgress} from "@mui/material";
import {useParams} from "react-router";
import {useGetMovie} from "../hooks/UseTMDBs.ts";
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import {MediaInfo} from "../components/MediaInfo.tsx";
import {MediaTrailer} from "../components/MediaTrailer.tsx";
import {MediaPoster} from "../components/MediaPoster.tsx";
import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

export function MovieDetailPage() {
    const {mediaId} = useParams();
    const {movie} = useGetMovie(Number(mediaId)!);
    // TODO NEEDED?
    const normalizedScore = Math.min(10, Math.max(0, movie.vote_average));

    // const backdrop = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original`;

    return (
        <Box mt={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
            <Stack direction={"row"}>
                <Stack direction={"row"} gap={4} width={"60%"}>
                    {/*MOVIE POSTER*/}
                    <MediaPoster media={movie}/>

                    {/*MOVIE TITLE, TAGLINE, RELEASE YEAR, DURATION, OVERVIEW */}
                    <MediaInfo movie={movie}/>

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
                    {/*MOVIE TRAILER*/}
                    <MediaTrailer media={movie}/>

                    {/* MOVIE STATS */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" px={3} py={2}
                           borderRadius={5} sx={{bgcolor: "background.paper"}}>
                        {/* Budget */}
                        <Stack alignItems="center">
                            <LocalAtmOutlinedIcon sx={{color: "text.secondary"}}/>
                            <Typography variant="h6">
                                {(movie.budget / 1_000_000).toFixed(1)} M
                            </Typography>
                        </Stack>

                        {/* Revenue */}
                        <Stack alignItems="center">
                            <PaidOutlinedIcon sx={{color: "text.secondary"}}/>
                            <Typography variant="h6">
                                {(movie.revenue / 1_000_000).toFixed(1)} M
                            </Typography>
                        </Stack>

                        {/* Vote count */}
                        <Stack alignItems="center">
                            <HowToVoteOutlinedIcon sx={{color: "text.secondary"}}/>
                            <Typography variant="h6">
                                {movie.vote_count}
                            </Typography>
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