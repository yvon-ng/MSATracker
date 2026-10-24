import {useUserMediaList, useUserMediaDetails} from "../hooks/UseUserMedia.ts";
import {Box} from "@mui/material";
import {PageHeader} from "../components/PageHeader.tsx";
import {MediaCollection} from "../components/media/MediaCollection.tsx";
import {type MouseEvent, useState} from "react";

export function CompletedPage() {
    const {userMedia} = useUserMediaList("completed");
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
            <PageHeader overline="Already Watched" title="Your" titleSuffix="Collection."
                        subtitle="Look how far you've come." trailingText={filteredMedia.length ? filteredMedia.length.toString() : ""}/>

            <MediaCollection media={mediaDetails} userMedia={userMedia} mediaTypeFilter={mediaTypeFilter}
                             onFilterChange={handleChange} filteredMedia={filteredMedia}/>
        </Box>
    );
}
