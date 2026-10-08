import {useSuspenseQuery} from "@tanstack/react-query";
import {getMediaByTitle} from "../services/mediaServices.ts";

export function useGetMediaByTitle(title: string) {
    const {data: media} = useSuspenseQuery({
        queryKey: ["media", title],
        queryFn: () => getMediaByTitle(title)
    })

    return {
        media: media
    };
}