import {PageHeader} from "../components/PageHeader.tsx";
import {Box, Stack} from "@mui/material";
import {useWatchlist, useWatchlistTMDBDetails} from "../hooks/UseUserMedia.ts";
import {MediaCard} from "../components/media/MediaCard.tsx";

export function WatchlistPage () {
    const {watchlist} = useWatchlist();
    const {mediaDetails} = useWatchlistTMDBDetails(watchlist);

    return (
        <Box my={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}>
            <PageHeader overline={"Saved for later"} title={"Your"} titleSuffix={"Watchlist."}
                        subtitle={"Pick what to watch next."}/>

            <Stack direction="row" flexWrap={"wrap"} gap={3} my={{xs: 10}}>
                {mediaDetails.map(item => (
                    <MediaCard media={item} key={`${item.media_type}-${item.id}`}/>
                ))}
            </Stack>
        </Box>
    )
}