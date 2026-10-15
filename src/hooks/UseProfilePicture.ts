import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfilePictureUrl } from "./storageServices.ts";

// TODO CHECK IF CORRECT
export function useProfilePicture(path: string) {
    const { data: profilePictureUrl } = useSuspenseQuery({
        queryKey: ["profile-picture", path],
        queryFn: () => getProfilePictureUrl(path),
        staleTime: 50 * 60 * 1000,
    });

    return {
        profilePictureUrl,
    };
}