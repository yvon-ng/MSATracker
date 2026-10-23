import type {AddMediaToListDto, NewUserMediaDto, UserMedia, UserMediaStatus} from "../model/UserMedia.ts";
import {supabase} from "../lib/supabaseClient.ts";
import {getOrAddMedia} from "./mediaServices.ts";
import type {UserMediaItem} from "../model/UserMedia.ts";

export async function getUserMedia(userId: string, media_id: string ): Promise<UserMedia | null> {
    const {data, error} = await supabase
        .from("user_media")
        .select("user_id, media_id, status, added_at, started_at, completed_at")
        .eq("user_id", userId)
        .eq("media_id", media_id)
        .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
        userId: data.user_id,
        mediaId: data.media_id,
        status: data.status,
        addedAt: data.added_at,
        startedAt: data.started_at,
        completedAt: data.completed_at
    };
}

export async function addUserMedia(userMedia: NewUserMediaDto): Promise<UserMedia> {
    const {data, error} = await supabase
        .from("user_media")
        .insert({
            user_id: userMedia.userId,
            media_id: userMedia.mediaId,
            status: userMedia.status,
        })
        .select("user_id, media_id, status, added_at, started_at")
        .single();

    if (error) throw error;

    return {
        userId: data.user_id,
        mediaId: data.media_id,
        status: data.status,
        addedAt: data.added_at,
        startedAt: data.started_at,
    };
}

export async function addMediaToList(addMediaToListDto: AddMediaToListDto): Promise<UserMedia> {
    const mediaRecord = await getOrAddMedia(addMediaToListDto.tmdbId, addMediaToListDto.mediaType);

    // check if user-media doesn't exist yet, TODO update this record when user wants to update...
    const userMediaRecord = await getUserMedia(addMediaToListDto.userId, mediaRecord.mediaId)
    if (userMediaRecord) return userMediaRecord;

    // if user-media doesn't exist then add a new UserMedia using that Media
    return addUserMedia({
        userId: addMediaToListDto.userId,
        mediaId: mediaRecord.mediaId,
        status: addMediaToListDto.status
    });
}

export async function getUserMediaList(userId: string, status: UserMediaStatus): Promise<UserMediaItem[]> {
    const {data, error} = await supabase
        .from("user_media")
        .select(`
            user_id,
            media_id,
            status,
            added_at,
            started_at,
            completed_at,
            media (
                media_id,
                tmdb_id,
                media_type
            )
        `)
        .eq("user_id", userId)
        .eq("status", status);

    if (error) throw error;

    return data.map((item) => ({
        userMedia: {
            userId: item.user_id,
            mediaId: item.media_id,
            status: item.status,
            addedAt: item.added_at,
            startedAt: item.started_at,
            completedAt: item.completed_at,
        },
        media: {
            mediaId: item.media.media_id,
            tmdbId: item.media.tmdb_id,
            mediaType: item.media.media_type,
        },
    }));
}