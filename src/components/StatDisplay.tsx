import {Stack, Typography} from "@mui/material";

interface StatDisplayProps {
    value: number;
    label: string;
}

export function StatDisplay({value, label}: StatDisplayProps) {
    return (
        <Stack spacing={0.5} alignItems="center" sx={{flex: 1}}>
            <Typography variant="h6">{value}</Typography>
            <Typography variant="caption" color="text.secondary" textAlign="center">{label}
            </Typography>
        </Stack>
    );
}