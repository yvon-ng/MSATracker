import {Stack, Typography} from "@mui/material";

interface MessageOfTheDayProps {
    overline?: string
    title?: string
    titleSuffix?: string
    subtitle?: string
}

export function PageHeader({overline, title, titleSuffix, subtitle}: MessageOfTheDayProps) {

    return (
        <Stack>
            <Typography variant="caption" fontWeight={500} color={"text.secondary"}
                        sx={{textTransform: "uppercase", letterSpacing: "0.15em", textWrap: "nowrap"}}>
                {overline}
            </Typography>
            <Stack direction={{xs: "column", md: "row"}} gap={{xs: 0, md: 2}} sx={{letterSpacing: -3}}>
                <Typography fontSize={{xs: "2.5rem", sm: "3rem", md: "4rem"}} fontWeight={500}
                            sx={{textWrap: "nowrap"}} color={titleSuffix ? "primary.main" : "secondary.main"}>
                    {title}
                </Typography>
                <Typography fontSize={{xs: "2.5rem", sm: "3rem", md: "4rem"}} fontWeight={500} color={"secondary"}
                            mt={{xs: -2, sm: -3, md: 0}}>
                    {titleSuffix}
                </Typography>
            </Stack>
            <Typography variant="subtitle2" fontWeight={500} color={"text.secondary"}>
                {subtitle}
            </Typography>
        </Stack>
    )
}