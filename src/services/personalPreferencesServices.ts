import {supabase} from "../lib/supabaseClient.ts";
import type {PersonalPreferences, UpdatePersonalPreferenceseDto} from "../model/PersonalPreferences.ts";

export async function getPersonalPreferences(userId: string): Promise<PersonalPreferences> {
    const {data, error} = await supabase
        .from("personal_preferences")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) throw error;

    return {
        personalPreferencesId: data.personal_preferences_id,
        showMediaBackdrop: data.show_media_backdrop,
        usernameAsDisplayName: data.username_as_display_name
    };
}

export async function updatePersonalPreferences(userId: string, preferences: UpdatePersonalPreferenceseDto): Promise<PersonalPreferences> {
    const updates = {
        ...(preferences.showMediaBackdrop !== undefined && {
            show_media_backdrop: preferences.showMediaBackdrop,
        }),
        ...(preferences.usernameAsDisplayName !== undefined && {
            username_as_display_name: preferences.usernameAsDisplayName,
        }),
    };

    const { data, error } = await supabase
        .from("personal_preferences")
        .update(updates)
        .eq("user_id", userId)
        .select("*")
        .single();

    if (error) throw error;

    return {
        personalPreferencesId: data.personal_preferences_id,
        showMediaBackdrop: data.show_media_backdrop,
        usernameAsDisplayName: data.username_as_display_name,
    };
}