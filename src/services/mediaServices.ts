import type {Media, MediaType, NewMediaDto} from "../model/Media.ts";
import {supabase} from "../lib/supabaseClient.ts";

export async function getOrAddMedia(tmdbId: number, mediaType: MediaType): Promise<Media> {
    const {data, error} = await supabase
        .from("media")
        .select("media_id")
        .eq("tmdb_id", tmdbId)
        .eq("media_type", mediaType)
        .maybeSingle();

    if (error) throw error;

    // check if Media exist in the database else add a new one
    if (!data) return addMedia({tmdbId: tmdbId, mediaType: mediaType});

    return {
        mediaId: data.media_id,
        tmdbId,
        mediaType
    }
}

export async function addMedia(media: NewMediaDto): Promise<Media> {
    const {data, error} = await supabase
        .from("media")
        .insert({
            tmdb_id: media.tmdbId,
            media_type: media.mediaType,
        })
        .select("media_id, tmdb_id, media_type")
        .single();

    if (error) throw error;

    return {
        mediaId: data.media_id,
        tmdbId: data.tmdb_id,
        mediaType: data.media_type,
    };
}