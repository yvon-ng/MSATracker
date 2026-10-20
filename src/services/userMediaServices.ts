import type {AddMediaToWatchlistDto, NewUserMediaDto, UserMedia} from "../model/UserMedia.ts";
import {supabase} from "../lib/supabaseClient.ts";
import {addMedia, getMediaByTmdbId} from "./mediaServices.ts";

export async function addUserMedia(userMedia: NewUserMediaDto): Promise<UserMedia> {
    const {data, error} = await supabase
        .from("user_media")
        .insert({
            user_id: userMedia.userId,
            media_id: userMedia.mediaId,
            status: userMedia.status,
        })
        .select("user_id, media_id, status, added_at")
        .single();

    if (error) throw error;

    return {
        userId: data.user_id,
        mediaId: data.media_id,
        status: data.status,
        addedAt: data.added_at,
    };
}

export async function addMediaToWatchlist(addMediaToWatchlistDto: AddMediaToWatchlistDto): Promise<UserMedia> {
    let mediaRecord = await getMediaByTmdbId(addMediaToWatchlistDto.tmdbId, addMediaToWatchlistDto.mediaType);
    if (!mediaRecord) mediaRecord = await addMedia({tmdbId: addMediaToWatchlistDto.tmdbId, mediaType: addMediaToWatchlistDto.mediaType});

    return addUserMedia({userId: addMediaToWatchlistDto.userId, mediaId: mediaRecord.mediaId, status: addMediaToWatchlistDto.status});
}