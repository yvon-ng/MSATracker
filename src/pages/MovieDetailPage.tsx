import {useParams} from "react-router";
import {useGetMovie} from "../hooks/UseTMDBs.ts";
import {MediaDetailLayout} from "./MediaDetailLayout.tsx";

export function MovieDetailPage() {
    const {mediaId} = useParams();
    const {movie} = useGetMovie(Number(mediaId)!);

    return <MediaDetailLayout media={movie} isMovie/>
}