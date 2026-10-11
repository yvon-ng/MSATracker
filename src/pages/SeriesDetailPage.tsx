import {MediaDetailLayout} from "./MediaDetailLayout.tsx";
import {useLocation, useParams} from "react-router";
import {useGetSeries} from "../hooks/UseTMDBs.ts";

export function SeriesDetailPage() {
    const {mediaId} = useParams();
    const location = useLocation();
    const {isMovie} = location.state;
    const {series} = useGetSeries(Number(mediaId)!);

    return <MediaDetailLayout media={series} isMovie={isMovie}/>
}