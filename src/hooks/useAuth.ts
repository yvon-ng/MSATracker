import {useMutation} from "@tanstack/react-query";
import {logInWithEmail, signUpNewUser} from "../services/authServices.ts";

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
        mutationFn: ({email, password, firstName, lastName, userName}: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            userName: string
        }) => signUpNewUser(email, password, firstName, lastName, userName),
    });

    return {
        signUp,
        isSigningUp,
        error,
    };
}