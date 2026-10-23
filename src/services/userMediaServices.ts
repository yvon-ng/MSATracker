import type {
    AddMediaToListDto,
    AddMediaToListResult,
    NewUserMediaDto,
    UserMedia,
    UserMediaStatus
} from "../model/UserMedia.ts";
import {supabase} from "../lib/supabaseClient.ts";
import {getOrAddMedia} from "./mediaServices.ts";
import type {UserMediaItem} from "../model/UserMedia.ts";

async function getUserMedia(userId: string, media_id: string): Promise<UserMedia | null> {
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

async function addUserMedia(userMedia: NewUserMediaDto): Promise<UserMedia> {
    const now = new Date().toISOString();

    // when media is directly added to "currently_watching" or "completed" use date.now for those values
    const startedAt = userMedia.status === "currently_watching" || userMedia.status === "completed" ? now : null;
    const completedAt = userMedia.status === "completed" ? now : null;

    const {data, error} = await supabase
        .from("user_media")
        .insert({
            user_id: userMedia.userId,
            media_id: userMedia.mediaId,
            status: userMedia.status,
            started_at: startedAt,
            completed_at: completedAt,
        })
        .select("user_id, media_id, status, added_at, started_at, completed_at")
        .single();

    if (error) throw error;

    return {
        userId: data.user_id,
        mediaId: data.media_id,
        status: data.status,
        addedAt: data.added_at,
        startedAt: data.started_at,
        completedAt: data.completed_at,
    };
}

async function updateUserMedia(userId: string, mediaId: string, status: UserMediaStatus, previous: UserMedia): Promise<UserMedia> {
    const now = new Date().toISOString();

    // only keep the first time a media is started and completed
    const startedAt = previous.startedAt ?? (status === "currently_watching" || status === "completed" ? now : null);
    const completedAt = previous.completedAt ?? (status === "completed" ? now : null);

    const {data, error} = await supabase
        .from("user_media")
        .update({
            status,
            started_at: startedAt,
            completed_at: completedAt,
        })
        .eq("user_id", userId)
        .eq("media_id", mediaId)
        .select("user_id, media_id, status, added_at, started_at, completed_at")
        .single();

    if (error) throw error;

    return {
        userId: data.user_id,
        mediaId: data.media_id,
        status: data.status,
        addedAt: data.added_at,
        startedAt: data.started_at,
        completedAt: data.completed_at,
    };
}

export async function addMediaToList(addMediaToListDto: AddMediaToListDto): Promise<AddMediaToListResult> {
    const mediaRecord = await getOrAddMedia(addMediaToListDto.tmdbId, addMediaToListDto.mediaType);

    // check if user-media doesn't exist yet
    const userMediaRecord = await getUserMedia(addMediaToListDto.userId, mediaRecord.mediaId)

    // if user-media exists
    if (userMediaRecord) {
        if (userMediaRecord.status === addMediaToListDto.status) {
            return {userMedia: userMediaRecord, previousStatus: userMediaRecord.status};
        }

        // update that existing record
        const updatedUserMedia = await updateUserMedia(
            addMediaToListDto.userId,
            mediaRecord.mediaId,
            addMediaToListDto.status,
            userMediaRecord
        );

        return {
            userMedia: updatedUserMedia,
            previousStatus: userMediaRecord.status,
        };
    }

    // if user-media doesn't exist then add a new UserMedia using that Media
    const newUserMedia = await addUserMedia({
        userId: addMediaToListDto.userId,
        mediaId: mediaRecord.mediaId,
        status: addMediaToListDto.status,
    });

    return {
        userMedia: newUserMedia,
        previousStatus: null,
    };
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

export async function getUserMediaStatuses(userId: string, media: { id: number; media_type: "movie" | "tv" }[]) {
    if (media.length === 0) return [];

    const tmdbIds = media.map((item) => item.id);

    const { data, error } = await supabase
        .from("user_media")
        .select(`
            status,
            media!inner (
                tmdb_id,
                media_type
            )
        `)
        .eq("user_id", userId)
        .in("media.tmdb_id", tmdbIds);

    if (error) throw error;

    return data;
}