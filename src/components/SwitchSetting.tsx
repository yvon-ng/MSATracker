
import { FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import {
    usePersonalPreferences,
    useUpdatePersonalPreferences,
} from "../hooks/UsePersonalPreferences.ts";
import type { PersonalPreferences } from "../model/PersonalPreferences.ts";

type SwitchSettingProps = {
    title: string;
    description: string;
    preferenceKey: keyof PersonalPreferences;
};

export function SwitchSetting({title, description, preferenceKey,}: SwitchSettingProps) {
    const { personalPreferences } = usePersonalPreferences();
    const { updatePersonalPreferences } = useUpdatePersonalPreferences();

    const handleChange = (checked: boolean) => {
        updatePersonalPreferences({ [preferenceKey]: checked });
    };

    return (
        <Stack>
            <FormControlLabel
                label={title}
                labelPlacement="start"
                control={
                    <Switch
                        checked={personalPreferences?.[preferenceKey] ?? false}
                        disabled={!personalPreferences}
                        onChange={(event) =>
                            handleChange(event.target.checked)
                        }
                        sx={{
                            width: 50,
                            height: 26,
                            padding: 0,
                            "& .MuiSwitch-switchBase": {
                                padding: "3px",
                                "&.Mui-checked": {
                                    transform: "translateX(25px)",
                                    color: "#fff",
                                    "& + .MuiSwitch-track": {
                                        backgroundColor: "secondary.main",
                                        opacity: 1,
                                    },
                                },
                            },
                            "& .MuiSwitch-thumb": {
                                width: 20,
                                height: 20,
                                boxShadow: "none",
                            },
                            "& .MuiSwitch-track": {
                                borderRadius: 13,
                                backgroundColor: "#80848E",
                                opacity: 1,
                            },
                        }}
                    />
                }
                sx={{
                    m: 0,
                    width: "100%",
                    justifyContent: "space-between",
                }}
            />
            <Typography variant="caption" color="text.secondary">
                {description}
            </Typography>
        </Stack>
    );
}
