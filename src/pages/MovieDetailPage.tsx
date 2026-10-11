import {Box, Stack, Typography, CircularProgress} from "@mui/material";
import {useParams} from "react-router";
import {useGetMovie, useGetMovieTrailer} from "../hooks/UseTMDBs.ts";
import {IMAGE_BASE_URL} from "../services/tmdbServices.ts";
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';

export function MovieDetailPage() {
    const {mediaId} = useParams();
    const {movie} = useGetMovie(Number(mediaId)!);
    const {trailer} = useGetMovieTrailer(Number(mediaId)!);
    const poster = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original`; //TODO better no poster picture
    // TODO NEEDED?
    const normalizedScore = Math.min(10, Math.max(0, movie.vote_average));

    // const backdrop = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original`;

    return (
        <Box mt={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
            <Stack direction={"row"}>
                <Stack direction={"row"} gap={4} width={"60%"}>
                    {/*MOVIE POSTER*/}
                    <Box component={"img"} src={poster} alt={movie.title + "poster"}
                         sx={{width: 400, borderRadius: 3}}/>

                    {/*MOVIE TITLE, TAGLINE, RELEASE YEAR, DURATION, OVERVIEW */}
                    <Stack>
                        <Typography variant={"h2"} fontWeight={"400"} ml={-0.5}>{movie.title}</Typography>

                        <Stack alignSelf={"flex-start"}> {/*TODO CHECK IF STILL NEEDED*/}
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Typography variant={"subtitle2"} fontWeight={"400"}
                                            color={"textSecondary"}>{movie.tagline}</Typography>

                                <Stack direction={"row"} gap={1}>
                                    <Typography variant={"subtitle1"} fontWeight={"400"}
                                                color={"textSecondary"}>{movie.release_date.slice(0, 4)}</Typography>
                                    <Typography variant={"subtitle1"} fontWeight={"800"}
                                                color={"textSecondary"}>{"\u2022"}</Typography>
                                    <Typography variant={"subtitle1"} fontWeight={"400"}
                                                color={"textSecondary"}>{movie.runtime + "m"}</Typography>
                                </Stack>
                            </Stack>
                            <Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}
                                        mt={8}>{movie.overview}</Typography>
                        </Stack>

                        {/*TODO*/}
                        {/*<Typography variant={"subtitle1"} fontWeight={"400"}*/}
                        {/*            color={"textSecondary"} mt={8}>{movie.popularity} </Typography>*/}
                        {/*<Typography variant={"subtitle1"} fontWeight={"400"}*/}
                        {/*            color={"textSecondary"}>{movie.original_language}</Typography>*/}
                        {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.genres}</Typography>*!/*/}
                        {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.belongs_to_collection}</Typography>*!/*/}
                        {/*/!*<Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}>{movie.production_companies}</Typography>*!/*/}
                        {/*<Typography variant={"subtitle1"} fontWeight={"400"}*/}
                        {/*            color={"textSecondary"}>{movie.vote_count}</Typography>*/}
                        {/*<Typography variant={"subtitle1"} fontWeight={"400"}*/}
                        {/*            color={"textSecondary"}>{movie.revenue}</Typography>*/}
                    </Stack>

                    {/*<Box component={"img"} src={backdrop} alt={movie.title + "backdrop"} sx={{width: 400, borderRadius: 3}}/>*/}
                </Stack>

                {/*MOVIE TRAILER*/}
                {trailer?.key && (
                    <Box sx={{
                        mb: 23,
                        mx: 10,
                        width: "40%",
                    }}>
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
                                title={`${movie.title} trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    border: 0,
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Stack>

            {/*MOVIE BUDGET, VOTE AVG*/}

            <Box display={"flex"} justifyContent={"end"} mt={-20} mr={10}>
                <Stack direction={"row"} gap={5}>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <Typography variant={"subtitle1"}
                                    fontWeight={600}>{(movie.budget / 1000000).toFixed(1)} M</Typography>
                        <LocalAtmOutlinedIcon color={"disabled"}/>
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

                        <Box
                            sx={{
                                position: "absolute",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6" fontWeight={600}>
                                {normalizedScore.toFixed(1)}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}