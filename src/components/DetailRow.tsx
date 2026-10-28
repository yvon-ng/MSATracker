import {Box, Divider, Typography} from "@mui/material";

interface DetailRowProps {
    label: string;
    value: string | undefined;
}

export function DetailRow({label, value}: DetailRowProps) {
    return (
        <Box width={500} pt={3}>
            <Typography variant={"caption"} color={"textSecondary"} textTransform={"uppercase"}
                        letterSpacing={"0.15rem"}>
                {label}
            </Typography>

            <Typography variant={"subtitle1"} mb={5}>{value}</Typography>

            <Divider/>
        </Box>
    )
}