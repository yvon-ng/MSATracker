import {useSuspenseQuery} from "@tanstack/react-query";
import {getMedia} from "../services/mediaServices.ts";
import type {MediaType} from "../model/Media.ts";

export function useMedia(tmdbId: number, mediaType: MediaType) {
    const {data: media} = useSuspenseQuery({
        queryKey: ["media", tmdbId, mediaType],
        queryFn: () => getMedia(tmdbId, mediaType)
    })

    return {
        media
    };
}