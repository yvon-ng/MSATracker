import {useMutation} from "@tanstack/react-query";
import {logInWithEmail, logOut, signUpNewUser} from "../services/authServices.ts";
import {isUsernameTaken} from "../services/userServices.ts";

export function useLogIn() {
    const {mutateAsync: login, isPending: isLoggingIn, error} = useMutation({
        mutationFn: ({email, password,}: {
            email: string;
            password: string;
        }) => logInWithEmail(email, password),
    });

    return {
        login,
        isLoggingIn,
        error,
    };
}

export function useSignUp() {
    const {mutateAsync: signUp, isPending: isSigningUp, error} = useMutation({
        mutationFn: async ({email, password, firstName, lastName, userName}: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            userName: string
        }) => {
            if (await isUsernameTaken(userName)) {
                throw new Error("USERNAME_TAKEN");
            }

            return signUpNewUser(email, password, firstName, lastName, userName);
        }
    });

    return {
        signUp,
        isSigningUp,
        error,
    };
}

export function useLogOut() {
    const {mutateAsync: logout, isPending: isLoggingOut, error,} = useMutation({
        mutationFn: logOut,
    });

    return {
        logout,
        isLoggingOut,
        error,
    };
}