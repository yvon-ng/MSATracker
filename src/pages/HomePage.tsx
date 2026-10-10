import {Box, Stack} from "@mui/material";
import {WelcomeMessage} from "../components/WelcomeMessage.tsx";
import {useGetTrendingMedia} from "../hooks/UseTMDBs.ts";
import {MediaCard} from "../components/MediaCard.tsx";

export function HomePage() {
    const {media} = useGetTrendingMedia();
    const titles = media?.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    ) ?? [];

    return (
        <Box mt={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
            <WelcomeMessage/>
            <Stack direction="row" flexWrap={"wrap"} gap={3} my={{xs: 10}}>
                {titles.map(item => (
                    <MediaCard tmdbMedia={item} key={`${item.media_type}-${item.id}`}/>
                ))}
            </Stack>
        </Box>
    )
}