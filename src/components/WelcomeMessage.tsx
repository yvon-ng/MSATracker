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
            <Typography variant="caption" fontWeight={500} color={"text.secondary"}
                        sx={{textTransform: "uppercase", letterSpacing: "0.15em", textWrap: "nowrap"}}>
                {formattedDate}
            </Typography>
            <Stack direction={{xs: "column", md: "row"}} gap={{xs: 0, md: 2}} sx={{letterSpacing: -3}}>
                {/*TODO actual user*/}
                <Typography fontSize={{xs: "3rem", md: "4rem"}} fontWeight={500} sx={{textWrap: "nowrap"}}>
                    Good evening,
                </Typography>
                <Typography fontSize={{xs: "3rem", md: "4rem"}} fontWeight={500} color={"secondary"}
                            mt={{xs: -3, md: 0}}>
                    Shaden.
                </Typography>
            </Stack>
            <Typography variant="subtitle2" fontWeight={500} color={"text.secondary"}>
                Pick up where you left off or discover something new.
            </Typography>
        </Stack>
    )
}