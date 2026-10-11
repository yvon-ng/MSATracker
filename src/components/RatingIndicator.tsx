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
                    value={normalizedScore * 10}
                    size={72}
                    thickness={4}
                    sx={{color}}
                />
                <Box
                    sx={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        {normalizedScore.toFixed(1)}
                    </Typography>
                </Box>
            </Box>
        </Tooltip>
    );
}
