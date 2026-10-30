import {Box, Divider, Stack, Typography} from "@mui/material";

interface DetailRowProps {
    prefix?: string;
    label: string;
    value: string | undefined;
}

export function DetailRow({prefix, label, value}: DetailRowProps) {
    return (
        <Stack pt={3}>
            <Stack direction={"row"} spacing={3} alignItems="baseline">
                {prefix && (
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        textTransform="uppercase"
                        letterSpacing="0.15rem"
                    >
                        {prefix}
                    </Typography>
                )}

                <Box width={500}>
                    <Typography variant={"caption"} color={"textSecondary"} textTransform={"uppercase"}
                                letterSpacing={"0.15rem"}>
                        {label}
                    </Typography>

                    <Typography variant={"subtitle1"} mb={5}>{value}</Typography>
                </Box>
            </Stack>

            <Divider/>
        </Stack>
    )
}