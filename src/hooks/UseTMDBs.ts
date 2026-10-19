import {useSuspenseQuery} from "@tanstack/react-query";
import {
    getMovie,
    getMovieTrailer,
    getSeries,
    getSeriesTrailer,
    getTrendingMedia,
    searchMulti
} from "../services/tmdbServices.ts";

export function useMultiSearch(query: string) {
    const {data: media} = useSuspenseQuery({
        queryKey: ["search", query],
        queryFn: () => searchMulti(query),
    })

    return {
        data: media,
    };
}

export function useGetTrendingMedia() {
    const {data: media} = useSuspenseQuery({
        queryKey: ["trending"],
        queryFn: () => getTrendingMedia()
    })

    return {
        media
    };
}

export function useGetMovie(movieId: number) {
    const {data: movie} = useSuspenseQuery({
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId)
    })

    return {
        movie
    };
}

export function useGetSeries(seriesId: number) {
    const {data: series} = useSuspenseQuery({
        queryKey: ["series", seriesId],
        queryFn: () => getSeries(seriesId)
    })

    return {
        series
    };
}

export function useGetMovieTrailer(movieId: number) {
    const {data: trailer} = useSuspenseQuery({
        queryKey: ["movie", "trailer", movieId],
        queryFn: () => getMovieTrailer(movieId)
    })

    return {
        trailer
    };
}

export function useGetSeriesTrailer(seriesId: number) {
    const {data: trailer} = useSuspenseQuery({
        queryKey: ["series", "trailer", seriesId],
        queryFn: () => getSeriesTrailer(seriesId)
    })

    return {
        trailer
    };
}
