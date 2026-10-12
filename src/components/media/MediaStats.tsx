import {Stack} from "@mui/material";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import type {MovieDetails, TVSeriesDetails} from "@lorenzopant/tmdb";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {RatingIndicator} from "../RatingIndicator.tsx";
import {MediaStatItem} from "./MediaStatItem.tsx";

interface MediaStatsProps {
    media: MovieDetails | TVSeriesDetails
    isMovie: boolean
}

export function MediaStats({media, isMovie}: MediaStatsProps) {
    const movie = isMovie ? (media as MovieDetails) : null;
    const series = !isMovie ? (media as TVSeriesDetails) : null;
    const iconSx = {color: "text.secondary"};

    function formatMillions(value: number) {
        return value > 0 ? `${(value / 1_000_000).toFixed(1)} M` : "N/A";
    }

    return (
        <Stack direction={"row"} justifyContent="space-between" alignItems="center" px={3} py={2}
               borderRadius={5} sx={{bgcolor: "background.paper"}}>

            {movie && (
                <>
                    {/* Movie Budget */}
                    <MediaStatItem
                        label="Estimated production budget (in USD)"
                        icon={<LocalAtmOutlinedIcon sx={iconSx}/>}
                        value={formatMillions(movie.budget)}
                    />
                    {/* Movie Revenue */}
                    <MediaStatItem
                        label="Worldwide box office revenue (in USD)"
                        icon={<PaidOutlinedIcon sx={iconSx}/>}
                        value={formatMillions(movie.revenue)}
                    />
                </>
            )}

            {/* Series status */}
            {series && (
                <MediaStatItem
                    label="Current series status"
                    icon={<EventRepeatOutlinedIcon sx={iconSx}/>}
                    value={series.status || "Unknown"}
                />
            )}

            {/* Vote count */}
            <MediaStatItem
                label="Total number of votes"
                icon={<HowToVoteOutlinedIcon sx={iconSx}/>}
                value={
                    <Stack direction={{xs: "column", sm: "row"}} gap={0.3} alignItems="center">
                        {media.vote_count}
                        <PersonOutlinedIcon sx={{fontSize: {xs: "1.1rem", sm: "1.4rem", lg: "1.5rem"}}}/>
                    </Stack>
                }
            />

            {/* Vote avg */}
            <RatingIndicator score={media.vote_average ?? 0}/>
        </Stack>
    )
}