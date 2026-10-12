import {Box, CircularProgress, Tooltip, Typography} from "@mui/material";

interface RatingIndicatorProps {
    score: number;
}

export function RatingIndicator({score}: RatingIndicatorProps) {
    const normalizedScore = Math.min(10, Math.max(0, score));
    const color = normalizedScore >= 7 ? "success.main" : normalizedScore >= 5 ? "warning.main" : "error.main";

    return (
        <Tooltip title="User rating (out of 10)" describeChild>
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
                    thickness={4}
                    sx={(theme) => ({
                        color,
                        [theme.breakpoints.up("lg")]: {
                            width: "72px !important",
                            height: "72px !important",
                        },
                        [theme.breakpoints.up("md")]: {
                            width: "62px !important",
                            height: "62px !important",
                        },
                        [theme.breakpoints.up("sm")]: {
                            width: "62px !important",
                            height: "62px !important",
                        },
                        [theme.breakpoints.up("xs")]: {
                            width: "52px !important",
                            height: "52px !important",
                        },
                    })}
                />
                <Box
                    sx={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography fontSize={{xs: "0.9rem", sm: "1.25rem", md: "1.25rem"}} fontWeight={600}>
                        {normalizedScore.toFixed(1)}
                    </Typography>
                </Box>
            </Box>
        </Tooltip>
    );
}
