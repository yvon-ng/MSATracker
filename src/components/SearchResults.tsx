import {Stack} from "@mui/material";
import {MediaCard} from "./media/MediaCard.tsx";
import {useMultiSearch} from "../hooks/UseTMDBs.ts";
import {useUserMediaStatuses} from "../hooks/UseUserMedia.ts";

interface SearchResultsProps {
    query: string;
}

export function SearchResults({query}: SearchResultsProps) {
    const {data} = useMultiSearch(query);

    const titles = data.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    );

    const { data: statuses = [] } = useUserMediaStatuses(titles);

    const statusMap = new Map(
        statuses.map((item) => [
            `${item.media.media_type === "series" ? "tv" : item.media.media_type}-${item.media.tmdb_id}`,
            item.status,
        ])
    );

    return (
        <Stack direction="row" flexWrap="wrap" gap={3}>
            {titles.map(item => (
                <MediaCard
                    media={item}
                    key={`${item.media_type}-${item.id}`}
                    userMediaStatus={statusMap.get(
                        `${item.media_type}-${item.id}`
                    )}
                />
            ))}
        </Stack>
    );
}