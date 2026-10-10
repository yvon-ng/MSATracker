import {useSuspenseQuery} from "@tanstack/react-query";
import {getTrendingMedia, searchMulti} from "../services/tmdbServices.ts";

export function useMultiSearch(query: string) {
    const {data: media} = useSuspenseQuery({
        queryKey: ["search", query],
        queryFn: () => searchMulti(query),
    })

    return {
        data: media,
    };
}

export function useGetTrendingMedia() {
    const {data: media} = useSuspenseQuery({
        queryKey: ["trending"],
        queryFn: () => getTrendingMedia()
    })

    return {
        media: media
    };
}
