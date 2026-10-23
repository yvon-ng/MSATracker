import {useMutation, useQueryClient, useSuspenseQueries, useSuspenseQuery} from "@tanstack/react-query";
import {addMediaToList, getUserMediaList, getUserMediaStatuses} from "../services/userMediaServices.ts";
import type {AddMediaToListDto, UserMediaStatus} from "../model/UserMedia.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import type {UserMediaItem} from "../model/UserMedia.ts";
import {getMovie, getSeries} from "../services/tmdbServices.ts";
import type {TMDBMedia} from "../model/TMDBMedia.ts";
import {staleTimes} from "../utils/utils.ts";

export function useAddMediaToList() {
    const queryClient = useQueryClient()
    const {mutate, isPending, isError,} = useMutation({
        mutationFn: (addMediaToListDto: AddMediaToListDto) => addMediaToList(addMediaToListDto),
        onSuccess: (result, variables) => {
            queryClient.invalidateQueries({
                queryKey: [variables.status, variables.userId],
            });

            if (result.previousStatus !== null && result.previousStatus !== variables.status) {
                queryClient.invalidateQueries({
                    queryKey: [
                        result.previousStatus,
                        variables.userId,
                    ],
                });
            }
        },
    })

    return {
        isPending,
        isError,
        addMediaToList: mutate,
    }
}

export function useUserMediaList(status: UserMediaStatus) {
    const {user} = UserAuth();

    const {data: userMedia} = useSuspenseQuery<UserMediaItem[]>({
        queryKey: [status, user!.userId],
        queryFn: () => getUserMediaList(user!.userId, status),
    })

    return {
        userMedia
    };
}

export function useUserMediaDetails(items: UserMediaItem[] | undefined) {
    const results = useSuspenseQueries({
        queries: (items ?? []).map(({media}) => ({
            queryKey: [media.mediaType === "movie" ? "movie" : "series", media.tmdbId,],
            queryFn: async (): Promise<TMDBMedia> => {
                const details = media.mediaType === "movie" ? await getMovie(media.tmdbId) : await getSeries(media.tmdbId);

                return {
                    ...details,
                    media_type: media.mediaType === "movie" ? "movie" : "tv",
                } as TMDBMedia;
            },
            staleTime: staleTimes.oneHour,
        })),
    });

    return {
        mediaDetails: results.map((result) => result.data),
    };
}

export function useUserMediaStatuses(media: { id: number; media_type: "movie" | "tv" }[]) {
    const {user} = UserAuth();

    const {data} = useSuspenseQuery({
        queryKey: [
            "user-media-statuses",
            user?.userId,
            media.map((item) => `${item.media_type}-${item.id}`),
        ],
        queryFn: () => getUserMediaStatuses(user!.userId, media),
    });

    return {data}
}