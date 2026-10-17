import {Stack, TextField, Typography} from "@mui/material";
import type {ReactNode} from "react";

interface LabeledTextFieldProps {
    label: string;
    value: string | null | undefined;
    disabled?: boolean;
    onChange?: (value: string) => void;
    startAdornment?: ReactNode;
}

export function LabeledTextField({label, value, disabled = false, onChange, startAdornment}: LabeledTextFieldProps) {
    return (
        <Stack spacing={1} flex={1}>
            <Typography variant={"caption"} color={"textSecondary"} >{label}</Typography>
            <TextField
                fullWidth
                required
                variant="outlined"
                disabled={disabled}
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                slotProps={{
                    input: {
                        startAdornment,
                    },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        pl: startAdornment ? 0 : "auto",
                        borderRadius: 2,
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "0.8rem",
                    },
                }}
            />
        </Stack>
    )
}