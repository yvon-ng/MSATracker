import {Stack, Typography} from "@mui/material";

import type {MovieDetails, TVSeriesDetails} from "@lorenzopant/tmdb";

interface MediaInfoProps {
    media: MovieDetails | TVSeriesDetails
    isMovie: boolean
}

export function MediaInfo({media, isMovie}: MediaInfoProps) {
    const title = isMovie ? (media as MovieDetails).title : (media as TVSeriesDetails).name;
    const runtime = isMovie ? (media as MovieDetails).runtime : (media as TVSeriesDetails).episode_run_time?.[0];
    const tagline = isMovie ? (media as MovieDetails).tagline : (media as TVSeriesDetails).tagline;

    function getSeriesYears(series: TVSeriesDetails) {
        const start = series.first_air_date?.slice(0, 4);
        const end = series.last_air_date?.slice(0, 4);

        if (!start) return null;
        if (!end || start === end) return start;

        return `${start}-${end}`;
    }


    return (
        <Stack>
            <Typography variant={"h2"} fontWeight={"400"} ml={-0.5}>{title}</Typography>

            <Stack alignSelf={"flex-start"}> {/*TODO CHECK IF STILL NEEDED*/}
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant={"subtitle2"} fontWeight={"400"}
                                color={"textSecondary"}>{tagline}</Typography>

                    <Stack direction={"row"} gap={1}>
                        <Typography variant={"subtitle1"} fontWeight={"400"}
                                    color={"textSecondary"}>{isMovie ? (media as MovieDetails).release_date.slice(0, 4) : getSeriesYears(media as TVSeriesDetails)}</Typography>
                        {!isMovie && (
                            <>
                                <Typography variant={"subtitle1"} fontWeight={"600"}
                                            color={"textSecondary"}>{"\u2022"}</Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    S{(media as TVSeriesDetails).number_of_seasons}
                                </Typography>
                            </>
                        )}
                        <Typography variant={"subtitle1"} fontWeight={"600"}
                                    color={"textSecondary"}>{"\u2022"}</Typography>
                        <Typography variant={"subtitle1"} fontWeight={"400"}
                                    color={"textSecondary"}>{runtime + "min"}</Typography>
                    </Stack>

                </Stack>
                <Typography variant={"subtitle1"} fontWeight={"400"} color={"textSecondary"}
                            mt={8}>{media.overview}</Typography>
            </Stack>
        </Stack>
    )
}