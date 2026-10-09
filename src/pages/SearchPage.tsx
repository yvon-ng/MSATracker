import {Box, Stack} from "@mui/material";
import {MediaCard} from "../components/MediaCard.tsx";
import {useMultiSearch} from "../hooks/UseTMDBs.ts";
import {useSearchParams} from "react-router";

export function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const {data} = useMultiSearch(query);
    const titles = data?.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    ) ?? [];

    return (
        <>
            <Box mt={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
                <Stack direction="row" flexWrap={"wrap"} gap={3} my={{xs: 10, xl: 20}}>
                    {titles.map(item => (
                        <MediaCard tmdbMedia={item} key={`${item.media_type}-${item.id}`}/>
                    ))}
                </Stack>
            </Box>
        </>
    )
}