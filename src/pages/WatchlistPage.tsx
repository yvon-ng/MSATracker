import {PageHeader} from "../components/PageHeader.tsx";
import {Box} from "@mui/material";
import {useUserMediaList, useUserMediaDetails} from "../hooks/UseUserMedia.ts";
import {MediaCollection} from "../components/media/MediaCollection.tsx";
import {useState} from "react";
import {type MouseEvent} from "react";

export function WatchlistPage () {
    const {userMedia} = useUserMediaList("watchlist");
    const {mediaDetails} = useUserMediaDetails(userMedia);
    const [mediaTypeFilter, setMediaTypeFilter] = useState("all");

    const filteredMedia = mediaTypeFilter === "all" ? mediaDetails
        : mediaDetails.filter((item) => mediaTypeFilter === "movie" ? item.media_type === "movie" : item.media_type === "tv");

    const handleChange = (
        _event: MouseEvent<HTMLElement>,
        newFilter: string | null
    ) => {
        if (newFilter !== null) {
            setMediaTypeFilter(newFilter);
        }
    };

    return (
        <Box my={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}>
            <PageHeader overline={"Saved for later"} title={"Your"} titleSuffix={"Watchlist."}
                        subtitle={"Pick what to watch next."} trailingText={filteredMedia.length ? filteredMedia.length.toString() : ""}/>

            <MediaCollection media={mediaDetails} userMedia={userMedia} mediaTypeFilter={mediaTypeFilter}
                             onFilterChange={handleChange} filteredMedia={filteredMedia}/>
        </Box>
    )
}