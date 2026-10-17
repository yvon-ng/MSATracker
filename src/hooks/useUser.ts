import {useMutation} from "@tanstack/react-query";
import type {UpdateUserDto} from "../model/User.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {updateUser} from "../services/userServices.ts";

export function useUpdateUser(userId: string | undefined) {
    const { setUser } = UserAuth();

    const {mutate, isPending, error} = useMutation({
        mutationFn: (userDto: UpdateUserDto) => {
            if (!userId) throw new Error("You must be logged in to update your profile.");
            return updateUser(userId, userDto);
        },

        onSuccess: (updatedUser) => {
            setUser(updatedUser);
        },
    });

    return {
        isPending,
        error,
        updateUser: mutate,
    };
}