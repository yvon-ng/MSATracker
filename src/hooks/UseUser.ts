import {useMutation} from "@tanstack/react-query";
import type {UpdateUserDto} from "../model/User.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {updateUser} from "../services/userServices.ts";

export function useUpdateUser() {
    const {user, setUser } = UserAuth();

    const {mutate, isPending, error} = useMutation({
        mutationFn: (userDto: UpdateUserDto) => updateUser(user!.userId, userDto),
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