import {Stack, Typography} from "@mui/material";

import type {MovieDetails} from "@lorenzopant/tmdb";

interface MediaInfoProps {
    movie: MovieDetails
}

export function MediaInfo({movie}: MediaInfoProps) {
    return (
        <Stack>
            {/*MOVIE TITLE, TAGLINE, RELEASE YEAR, DURATION, OVERVIEW */}

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
        </Stack>
    )
}