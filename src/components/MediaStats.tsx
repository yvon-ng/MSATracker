import {Box, CircularProgress, Stack, Tooltip, Typography} from "@mui/material";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import type {MovieDetails, TVSeriesDetails} from "@lorenzopant/tmdb";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

interface MediaStatsProps {
    media: MovieDetails | TVSeriesDetails
    isMovie: boolean
}

export function MediaStats ({media, isMovie}: MediaStatsProps) {
    const normalizedScore = Math.min(10, Math.max(0, media.vote_average));

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={3} py={2}
               borderRadius={5} sx={{bgcolor: "background.paper"}}>

            {isMovie && (
                <>
                    {/* Movie Budget */}
                    <Tooltip title={"Estimated production budget (in USD)"} describeChild>
                        <Stack alignItems="center">
                            <LocalAtmOutlinedIcon sx={{color: "text.secondary"}}/>
                            <Typography variant="h6">
                                {(media as MovieDetails).budget > 0
                                    ? `${((media as MovieDetails).budget / 1_000_000).toFixed(1)} M`
                                    : "N/A"}
                            </Typography>
                        </Stack>
                    </Tooltip>

                    {/* Movie Revenue */}
                    <Tooltip title={"Worldwide box office revenue (in USD)"} describeChild>
                        <Stack alignItems="center">
                            <PaidOutlinedIcon sx={{color: "text.secondary"}}/>
                            <Typography variant="h6">
                                {(media as MovieDetails).revenue > 0
                                    ? `${((media as MovieDetails).revenue / 1_000_000).toFixed(1)} M`
                                    : "N/A"}
                            </Typography>
                        </Stack>
                    </Tooltip>
                </>
            )}

            {/* Series status */}
            {!isMovie && (
                <Tooltip title={"Current series status"} describeChild>
                    <Stack alignItems="center">
                        <EventRepeatOutlinedIcon sx={{color: "text.secondary"}}/>
                        <Typography variant="h6">
                            {(media as MovieDetails).status}
                        </Typography>
                    </Stack>
                </Tooltip>
            )}

            {/* Vote count */}
            <Tooltip title="Total number of votes" describeChild>
                <Stack alignItems="center">
                    <HowToVoteOutlinedIcon sx={{color: "text.secondary"}}/>
                    <Stack direction={"row"} gap={0.3} alignItems={"center"} justifyContent={"center"}>
                        <Typography variant="h6">
                            {media.vote_count}
                        </Typography>
                        <PersonOutlinedIcon/>
                    </Stack>
                </Stack>
            </Tooltip>

            {/* Vote avg */}
            <Tooltip title="User rating (out of 10)" describeChild>
                <Box sx={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center"
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
            </Tooltip>
        </Stack>
    )
}