import {useUserMediaList, useUserMediaDetails} from "../hooks/UseUserMedia.ts";
import {Box} from "@mui/material";
import {PageHeader} from "../components/PageHeader.tsx";
import {MediaCollection} from "../components/media/MediaCollection.tsx";

export function CompletedPage() {
    const {userMedia} = useUserMediaList("completed");
    const {mediaDetails} = useUserMediaDetails(userMedia);

    return (
        <Box my={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}>
            <PageHeader overline="Already Watched" title="Your" titleSuffix="Collection."
                        subtitle="Look how far you've come."/>

            <MediaCollection media={mediaDetails} userMedia={userMedia}/>
        </Box>
    );
}
