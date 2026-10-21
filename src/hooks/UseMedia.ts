import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addMediaToList} from "../services/userMediaServices.ts";
import type {AddMediaToListDto} from "../model/UserMedia.ts";

export function useAddMediaToList() {
    const queryClient = useQueryClient()
    const {mutate, isPending, isError,} = useMutation({
        mutationFn: (addMediaToWatchlistDto: AddMediaToListDto) => {
            return addMediaToList(addMediaToWatchlistDto)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['medias']}),
    })

    return {
        isPending,
        isError,
        addMediaToList: mutate,
    }
}
