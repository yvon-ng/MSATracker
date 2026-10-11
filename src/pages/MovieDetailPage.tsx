import {useLocation, useParams} from "react-router";
import {useGetMovie} from "../hooks/UseTMDBs.ts";
import {MediaDetailLayout} from "./MediaDetailLayout.tsx";

export function MovieDetailPage() {
    const {mediaId} = useParams();
    const location = useLocation();
    const {isMovie} = location.state;
    const {movie} = useGetMovie(Number(mediaId)!);

    return <MediaDetailLayout media={movie} isMovie={isMovie}/>
}