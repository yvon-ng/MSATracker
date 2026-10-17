import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPersonalPreferences, updatePersonalPreferences} from "../services/personalPreferencesServices.ts";
import type {UpdatePersonalPreferenceseDto} from "../model/PersonalPreferences.ts";

export function usePersonalPreferences(userId: string | undefined) {
    const {data: personalPreferences} = useQuery({
        queryKey: ["personal-preferences", userId],
        queryFn: () => getPersonalPreferences(userId!),
        enabled: !!userId,
    });

    return {
        personalPreferences: personalPreferences
    };
}

export function useUpdatePersonalPreferences(userId: string | undefined) {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError} = useMutation({
        mutationFn: (preferences: UpdatePersonalPreferenceseDto) => {
            if (!userId) throw new Error("You must be logged in to update your personal preferences.");
            return updatePersonalPreferences(userId, preferences);
        },

        onSuccess: (updatedPreferences) => {
            queryClient.setQueryData(
                ["personal-preferences", userId],
                updatedPreferences,
            );
        },
    });

    return {
        isPending,
        isError,
        updatePersonalPreferences: mutate,
    };
}