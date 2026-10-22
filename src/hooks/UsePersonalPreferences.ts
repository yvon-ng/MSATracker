import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {getPersonalPreferences, updatePersonalPreferences} from "../services/personalPreferencesServices.ts";
import type {UpdatePersonalPreferencesDto} from "../model/PersonalPreferences.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";

export function usePersonalPreferences() {
    const { user } = UserAuth();

    const {data: personalPreferences} = useSuspenseQuery({
        queryKey: ["personal-preferences", user!.userId],
        queryFn: () => getPersonalPreferences(user!.userId),
    });

    return {
        personalPreferences
    };
}

export function useUpdatePersonalPreferences() {
    const queryClient = useQueryClient();
    const { user } = UserAuth();

    const {mutate, isPending, error} = useMutation({
        mutationFn: (preferences: UpdatePersonalPreferencesDto) => {
            return updatePersonalPreferences(user!.userId, preferences);
        },

        onSuccess: (updatedPreferences) => {
            queryClient.setQueryData(
                ["personal-preferences", user!.userId],
                updatedPreferences,
            );
        },
    });

    return {
        isPending,
        error,
        updatePersonalPreferences: mutate,
    };
}