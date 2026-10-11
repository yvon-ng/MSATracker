import { Stack, Tooltip, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface StatItemProps {
    label: string;
    icon: ReactNode;
    value: ReactNode;
}

export function MediaStatItem({ label, icon, value }: StatItemProps) {
    return (
        <Tooltip title={label} describeChild>
            <Stack alignItems="center" justifyContent="center">
                {icon}
                <Typography variant="h6">{value}</Typography>
            </Stack>
        </Tooltip>
    );
}
