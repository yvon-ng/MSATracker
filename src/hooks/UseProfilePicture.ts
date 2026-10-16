import { useSuspenseQuery } from "@tanstack/react-query";
import { getProfilePictureUrl } from "./storageServices.ts";

export function useProfilePicture(path: string) {
    const { data: profilePictureUrl } = useSuspenseQuery({
        queryKey: ["profile-picture", path],
        queryFn: () => getProfilePictureUrl(path),
        staleTime: 50 * 60 * 1000, //10 mins breathing room vs signed url refetch
    });

    return {
        profilePictureUrl,
    };
}