import {MediaCard} from "../components/MediaCard.tsx";
import {useMultiSearch} from "../hooks/UseTMDBs.ts";
import {Box, Stack} from "@mui/material";
import {WelcomeMessage} from "../components/WelcomeMessage.tsx";

export function HomePage() {
    const {data} = useMultiSearch("south park");
    const titles = data?.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    ) ?? [];

    return (
        <Box mx={{xs: 0,md: 10}}>
            <WelcomeMessage/>
            <Stack direction="row" flexWrap={"wrap"} gap={3} my={20}>
                {titles.map(item => (
                    <MediaCard tmdbMedia={item} key={`${item.media_type}-${item.id}`}/>
                ))}
            </Stack>
        </Box>
    )
}