import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {addProfilePicture, getProfilePictureUrl} from "../services/storageServices.ts";
import {updateProfilePicture as updateProfilePictureService} from "../services/userServices.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {staleTimes} from "../utils/utils.ts";

export function useProfilePicture(path: string) {
    const {data: profilePictureUrl} = useSuspenseQuery({
        queryKey: ["profile-picture", path],
        queryFn: () => getProfilePictureUrl(path),
        staleTime: staleTimes.oneHour - 10, //10 mins breathing room against the signed url refetch
    });

    return {
        profilePictureUrl,
    };
}

export function useChangeProfilePicture() {
    const queryClient = useQueryClient();
    const {setUser} = UserAuth();

    const {mutate: changePicture, isPending, error} = useMutation({
        mutationFn: async ({userId, file}: {userId: string; file: File}) => {
            const filename = await addProfilePicture(file, userId);
            return updateProfilePictureService(userId, filename);
        },
        onSuccess: (updatedUser) => {
            setUser(updatedUser);
            queryClient.invalidateQueries({
                queryKey: ["profile-picture", `${updatedUser.userId}/${updatedUser.profilePicture}`],
            });
        },
    });

    return {changePicture, isPending, error};
}