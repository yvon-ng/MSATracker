import {Stack} from "@mui/material";
import {MediaCard} from "./media/MediaCard.tsx";
import {useMultiSearch} from "../hooks/UseTMDBs.ts";
import {useUserMediaList} from "../hooks/UseUserMedia.ts";

interface SearchResultsProps {
    query: string;
}

export function SearchResults({query}: SearchResultsProps) {
    const {data} = useMultiSearch(query);

    const titles = data.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    );

    //TODO same as homepage (1 qµuery)
    const { userMedia: watchlist } = useUserMediaList("watchlist");
    const { userMedia: watching } = useUserMediaList("currently_watching");
    const { userMedia: completed } = useUserMediaList("completed");

    const savedMedia = [...watchlist, ...watching, ...completed];

    const getStatus = (tmdbId: number, mediaType: "movie" | "tv") => {
        const match = savedMedia.find(
            item =>
                Number(item.media.tmdbId) === tmdbId &&
                (item.media.mediaType === "movie" ? "movie" : "tv") === mediaType
        );

        return match?.userMedia.status;
    };

    return (
        <Stack direction="row" flexWrap="wrap" gap={3}>
            {titles.map(item => (
                <MediaCard
                    media={item}
                    key={`${item.media_type}-${item.id}`}
                    userMediaStatus={getStatus(item.id, item.media_type)}
                />
            ))}
        </Stack>
    );
}