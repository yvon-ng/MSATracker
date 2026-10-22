import {useMutation, useQueryClient, useSuspenseQueries, useSuspenseQuery} from "@tanstack/react-query";
import {addMediaToList, getWatchlistMedia} from "../services/userMediaServices.ts";
import type {AddMediaToListDto} from "../model/UserMedia.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import type {UserMediaItem} from "../model/WatchlistItem.ts";
import {getMovie, getSeries} from "../services/tmdbServices.ts";
import type {TMDBMedia} from "../model/TMDBMedia.ts";

export function useAddMediaToList() {
    const {user} = UserAuth();

    const queryClient = useQueryClient()
    const {mutate, isPending, isError,} = useMutation({
        mutationFn: (addMediaToWatchlistDto: AddMediaToListDto) => addMediaToList(addMediaToWatchlistDto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["watchlist", user!.userId]});
        },
    })

    return {
        isPending,
        isError,
        addMediaToList: mutate,
    }
}

export function useWatchlist() {
    const {user} = UserAuth();

    const {data: watchlist} = useSuspenseQuery<UserMediaItem[]>({
        queryKey: ["watchlist", user!.userId],
        queryFn: () => getWatchlistMedia(user!.userId)
    })

    return {
        watchlist
    };
}

export function useWatchlistTMDBDetails(items: UserMediaItem[] | undefined) {
    const results = useSuspenseQueries({
        queries: (items ?? []).map(({ media }) => ({
            queryKey: [media.mediaType === "movie" ? "movie" : "series", media.tmdbId,],
            queryFn: async (): Promise<TMDBMedia> => {
                const details = media.mediaType === "movie" ? await getMovie(media.tmdbId) : await getSeries(media.tmdbId);

                return {
                    ...details,
                    media_type: media.mediaType === "movie" ? "movie" : "tv",
                } as TMDBMedia;
            },
            staleTime: 1000 * 60 * 60,
        })),
    });

    return {
        mediaDetails: results.map((result) => result.data),
    };
}
