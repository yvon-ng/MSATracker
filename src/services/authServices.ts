import {supabase} from "../lib/supabaseClient.ts";

export async function logInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) throw error;

    return {data};
}

export async function signUpNewUser(email: string, password: string, firstName: string, lastName: string, userName: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'https://localhost:5173/home',
            data: {
                username: userName,
                email: email,
                first_name: firstName,
                last_name: lastName,
            }
        },
    })

    if (error) throw error;

    return {data};
}

export async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}