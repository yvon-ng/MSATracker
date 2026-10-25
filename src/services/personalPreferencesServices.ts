import {supabase} from "../lib/supabaseClient.ts";
import type {PersonalPreferences, UpdatePersonalPreferencesDto} from "../model/PersonalPreferences.ts";

export async function getPersonalPreferences(userId: string): Promise<PersonalPreferences> {
    const {data, error} = await supabase
        .from("personal_preferences")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) throw error;

    return {
        showMediaBackdrop: data.show_media_backdrop,
        usernameAsDisplayName: data.username_as_display_name,
        showExtraLabels: data.show_extra_labels
    };
}

export async function updatePersonalPreferences(userId: string, preferences: UpdatePersonalPreferencesDto): Promise<PersonalPreferences> {
    const updates = {
        ...(preferences.showMediaBackdrop !== undefined && {
            show_media_backdrop: preferences.showMediaBackdrop,
        }),
        ...(preferences.usernameAsDisplayName !== undefined && {
            username_as_display_name: preferences.usernameAsDisplayName,
        }),
        ...(preferences.showExtraLabels !== undefined && {
            show_extra_labels: preferences.showExtraLabels,
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
        showMediaBackdrop: data.show_media_backdrop,
        usernameAsDisplayName: data.username_as_display_name,
        showExtraLabels: data.show_extra_labels
    };
}