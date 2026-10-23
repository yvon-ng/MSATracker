import {useUserMediaDetails, useUserMediaList} from "../hooks/UseUserMedia.ts";
import {Box, Stack} from "@mui/material";
import {PageHeader} from "../components/PageHeader.tsx";
import {MediaCard} from "../components/media/MediaCard.tsx";

export function WatchingPage() {
    const {userMedia} = useUserMediaList("currently_watching");
    const {mediaDetails} = useUserMediaDetails(userMedia);

    return (
        <Box my={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}>
            <PageHeader overline={"Midway Through"} title={"Currently"} titleSuffix={"Watching."}
                        subtitle={"All the movies and series you're watching."}/>

            <Stack direction="row" flexWrap={"wrap"} gap={3} my={{xs: 10}}>
                {mediaDetails.map((item, index) => (
                    <MediaCard media={item} key={`${item.media_type}-${item.id}`} userMediaStatus={userMedia[index].userMedia.status}/>
                ))}
            </Stack>
        </Box>
    )
}