import {Stack, Typography} from "@mui/material";

export function WelcomeMessage() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <Stack>
            <Typography variant="caption" fontWeight={500} color={"text.secondary"} sx={{textTransform: "uppercase", letterSpacing: "0.15em", textWrap: "nowrap"}} >
                {formattedDate}
            </Typography>
            <Stack direction={{xs: "column", md: "row"}} gap={{xs: 0, md: 2}} sx={{letterSpacing: -5}}>
                {/*TODO*/}
                <Typography variant="h2" fontWeight={500} sx={{textWrap: "nowrap"}}>
                    Good evening,
                </Typography>
                <Typography variant="h2" fontWeight={500} color={"secondary"}>
                    Shaden.
                </Typography>
            </Stack>
            <Typography variant="subtitle2" fontWeight={500} color={"text.secondary"}>
                Pick up where you left off or discover something new.
            </Typography>
        </Stack>
    )
}