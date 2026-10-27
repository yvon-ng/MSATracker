import {supabase} from "../lib/supabaseClient.ts";
import type {UpdateUserDto, User} from "../model/User.ts";

export async function updateUser(userId: string, updates: UpdateUserDto): Promise<User> {
    const dbUpdates = {
        ...(updates.firstName !== undefined && {
            first_name: updates.firstName,
        }),
        ...(updates.lastName !== undefined && {
            last_name: updates.lastName,
        }),
    };

    const {data, error} = await supabase
        .from("users")
        .update(dbUpdates)
        .eq("user_id", userId)
        .select("user_id, username, email, first_name, last_name, profile_picture")
        .single();

    if (error) throw error;

    return {
        userId: data.user_id,
        username: data.username,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        profilePicture: data.profile_picture,
    };
}

export async function updateProfilePicture(userId: string, fileName: string) {
    const { data, error } = await supabase
        .from("users")
        .update({ profile_picture: fileName })
        .eq("user_id", userId)
        .select()
        .single();

    if (error) throw error;

    return {
        userId: data.user_id,
        username: data.username,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        profilePicture: data.profile_picture,
    };
}


export async function isUsernameTaken(username: string): Promise<boolean> {
    const { data, error } = await supabase.rpc(
        "is_username_taken",
        { check_username: username }
    );

    if (error) throw error;

    return data;
}
