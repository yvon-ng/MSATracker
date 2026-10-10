import {Stack} from "@mui/material";
import {MediaCard} from "./MediaCard.tsx";
import {useMultiSearch} from "../hooks/UseTMDBs.ts";

interface SearchResultsProps {
    query: string;
}

export function SearchResults({query}: SearchResultsProps) {
    const {data} = useMultiSearch(query);

    const titles = data.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    );

    return (
        <Stack direction="row" flexWrap="wrap" gap={3}>
            {titles.map(item => (
                <MediaCard tmdbMedia={item} key={`${item.media_type}-${item.id}`}/>
            ))}
        </Stack>
    );
}