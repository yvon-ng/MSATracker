import {PageHeader} from "../components/PageHeader.tsx";
import {Box} from "@mui/material";
import {useUserMediaList, useUserMediaDetails} from "../hooks/UseUserMedia.ts";
import {MediaCollection} from "../components/media/MediaCollection.tsx";

export function WatchlistPage () {
    const {userMedia} = useUserMediaList("watchlist");
    const {mediaDetails} = useUserMediaDetails(userMedia);

    return (
        <Box my={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}>
            <PageHeader overline={"Saved for later"} title={"Your"} titleSuffix={"Watchlist."}
                        subtitle={"Pick what to watch next."}/>

            <MediaCollection media={mediaDetails} userMedia={userMedia}/>
        </Box>
    )
}