import type {AddMediaToListDto, NewUserMediaDto, UserMedia} from "../model/UserMedia.ts";
import {supabase} from "../lib/supabaseClient.ts";
import {addMedia, getMediaByTmdbIdAndMediaType} from "./mediaServices.ts";
import type {UserMediaItem} from "../model/WatchlistItem.ts";

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
    // check if Media exist in the database
    let mediaRecord = await getMediaByTmdbIdAndMediaType(addMediaToListDto.tmdbId, addMediaToListDto.mediaType);

    // if Media doesn't exist yet create a new one
    if (!mediaRecord) mediaRecord = await addMedia({
        tmdbId: addMediaToListDto.tmdbId,
        mediaType: addMediaToListDto.mediaType
    });

    // add a new UserMedia using that Media TODO also check if usermedia doesnt exist yet, only then create else update record
    return addUserMedia({
        userId: addMediaToListDto.userId,
        mediaId: mediaRecord.mediaId,
        status: addMediaToListDto.status
    });
}

export async function getWatchlistMedia(userId: string): Promise<UserMediaItem[]> {
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
        .eq("status", "watchlist");

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