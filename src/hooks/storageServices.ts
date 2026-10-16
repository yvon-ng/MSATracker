import { supabase } from "../lib/supabaseClient.ts";

export async function getProfilePictureUrl(path: string) {
    const { data, error } = await supabase.storage
        .from("profile-pictures")
        .createSignedUrl(path, 3600);

    if (error) throw error;

    return data.signedUrl;
}
