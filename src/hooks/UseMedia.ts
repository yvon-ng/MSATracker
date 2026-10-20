import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addMediaToWatchlist} from "../services/userMediaServices.ts";
import type {AddMediaToWatchlistDto} from "../model/UserMedia.ts";

export function useAddMediaToWatchlist() {
    const queryClient = useQueryClient()
    const {mutate, isPending, isError,} = useMutation({
        mutationFn: (addMediaToWatchlistDto: AddMediaToWatchlistDto) => {
            return addMediaToWatchlist(addMediaToWatchlistDto)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['medias']}),
    })

    return {
        isPending,
        isError,
        addMediaToWatchlist: mutate,
    }
}
