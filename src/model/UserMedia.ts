import type {MediaType} from "./Media.ts";

export type UserMediaStatus = 'watchlist' | 'currently watching' | 'completed';

export type UserMedia = {
    userId: string
    mediaId: string
    status: UserMediaStatus
    addedAt?: Date
    completedAt?: Date
}

export type NewUserMediaDto = Omit<UserMedia, "addedAt, completedAt">

export type AddMediaToWatchlistDto = {
    userId: string;
    tmdbId: number;
    mediaType: MediaType;
    status: UserMediaStatus;
};