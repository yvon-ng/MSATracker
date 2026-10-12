import {Box, Stack, Tooltip, Typography} from "@mui/material";
import type { ReactNode } from "react";

interface StatItemProps {
    label: string;
    icon: ReactNode;
    value: ReactNode;
}

export function MediaStatItem({ label, icon, value }: StatItemProps) {
    const words = typeof value === "string" ? value.split(" ") : null;

    return (
        <Tooltip title={label} describeChild>
            <Stack alignItems="center" justifyContent="center">
                {icon}
                <Typography
                    fontSize={{ xs: "0.9rem", sm: "1.25rem", md: "1.25rem" }}
                    textAlign="center"
                >
                    {words
                        ? words.map((word, index) => (
                            <Box
                                key={`${word}-${index}`}
                                component="span"
                                sx={{ display: { xs: "block", sm: "inline" } }}
                            >
                                {word}{" "}
                            </Box>
                        ))
                        : value}
                </Typography>
            </Stack>
        </Tooltip>
    );
}