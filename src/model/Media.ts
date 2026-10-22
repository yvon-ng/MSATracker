export type MediaType = 'movie' | 'series';

export type Media = {
    mediaId: string
    tmdbId: number
    mediaType: MediaType
}

export type NewMediaDto = Omit<Media, "mediaId">
