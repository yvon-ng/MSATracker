import {Box, Stack} from "@mui/material";
import {PageHeader} from "../components/PageHeader.tsx";
import {useGetTrendingMedia} from "../hooks/UseTMDBs.ts";
import {MediaCard} from "../components/media/MediaCard.tsx";
import {UserAuth} from "../context/AuthContextProvider.tsx";

export function HomePage() {
    const {media} = useGetTrendingMedia();
    const titles = media?.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    ) ?? [];

    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    const {user} = UserAuth()

    return (
        <Box my={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
            <PageHeader overline={formattedDate} title={"Good evening,"} titleSuffix={`${user?.username}.`}
                        subtitle={"Pick up where you left off or discover something new."}/>
            <Stack direction="row" flexWrap={"wrap"} gap={3} my={{xs: 10}}>
                {titles.map(item => (
                    <MediaCard media={item} key={`${item.media_type}-${item.id}`}/>
                ))}
            </Stack>
        </Box>
    )
}