import {useUserMediaDetails, useUserMediaList} from "../hooks/UseUserMedia.ts";
import {Box} from "@mui/material";
import {PageHeader} from "../components/PageHeader.tsx";
import {MediaCollection} from "../components/media/MediaCollection.tsx";

export function WatchingPage() {
    const {userMedia} = useUserMediaList("currently_watching");
    const {mediaDetails} = useUserMediaDetails(userMedia);

    return (
        <Box my={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}>
            <PageHeader overline={"Midway Through"} title={"Currently"} titleSuffix={"Watching."}
                        subtitle={"All the movies and series you're watching."}/>

            <MediaCollection media={mediaDetails} userMedia={userMedia}/>
        </Box>
    )
}