import {MediaDetailLayout} from "../components/media/MediaDetailLayout.tsx";
import {useParams} from "react-router";
import {useGetSeries} from "../hooks/UseTMDBs.ts";

export function SeriesDetailPage() {
    const {mediaId} = useParams();
    const {series} = useGetSeries(Number(mediaId)!);

    return <MediaDetailLayout media={series} isMovie={false}/>
}