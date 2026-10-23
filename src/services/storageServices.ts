import {supabase} from "../lib/supabaseClient.ts";
import {MIME_EXTENSIONS} from "../utils/pictureUitls.ts";
import {staleTimes} from "../utils/utils.ts";

export async function getProfilePictureUrl(path: string) {
    const {data, error} = await supabase.storage
        .from("profile-pictures")
        .createSignedUrl(path, staleTimes.oneHour / 1000);

    if (error) throw error;

    return data.signedUrl;
}

export async function addProfilePicture(file: File, userId: string) {
    if (!MIME_EXTENSIONS[file.type]) throw new Error("Please upload a supported image format.");
    const maxSize = 50 * 1024 * 1024; // 50 MB
    if (file.size > maxSize) throw new Error("The image must be smaller than 50 MB.");
    const filename = file.name;
    const filePath = `${userId}/${filename}`;

    const {error} = await supabase.storage // db only store filename so data from api call response isn't used therefor emitted
        .from("profile-pictures")
        .upload(filePath, file, {
            upsert: true,
            contentType: file.type,
        });

    if (error) throw error;

    return filename;
}
