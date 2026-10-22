import type {Media, MediaType, NewMediaDto} from "../model/Media.ts";
import {supabase} from "../lib/supabaseClient.ts";

export async function getMediaByTmdbIdAndMediaType(tmdbId: number, mediaType: MediaType): Promise<Pick<Media, "mediaId"> | null> {
    const {data, error} = await supabase
        .from("media")
        .select("media_id")
        .eq("tmdb_id", tmdbId)
        .eq("media_type", mediaType)
        .maybeSingle();

    if (error) throw error;
    return data ? {mediaId: data.media_id} : null;
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
