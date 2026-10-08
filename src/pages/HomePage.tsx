import {MediaCard} from "../components/MediaCard.tsx";
import {useMultiSearch} from "../hooks/UseTMDBs.ts";
import {Stack} from "@mui/material";

export function HomePage() {
    const { data } = useMultiSearch("south park");
    const titles  = data?.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    ) ?? [];

    return (
        <Stack direction="row" flexWrap={"wrap"} gap={3} m={3}>
            {titles.map(item => (
                <MediaCard tmdbMedia={item} key={`${item.media_type}-${item.id}`}/>
            ))}
        </Stack>
    )
}