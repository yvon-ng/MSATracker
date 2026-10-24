import {Box, Fade, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {type MouseEvent} from "react";
import type {TMDBMedia} from "../../model/TMDBMedia.ts";
import type {UserMediaItem} from "../../model/UserMedia.ts";
import {MediaCard} from "./MediaCard.tsx";

interface MediaCollectionProps {
    media: TMDBMedia[];
    userMedia: UserMediaItem[];
    mediaTypeFilter: string;
    filteredMedia: TMDBMedia[]
    onFilterChange: (event: MouseEvent<HTMLElement>, value: string | null) => void;
}

export function MediaCollection({media, userMedia, mediaTypeFilter, onFilterChange, filteredMedia}: MediaCollectionProps) {

    return (
        <Stack my={10} gap={3}>
            <ToggleButtonGroup
                value={mediaTypeFilter}
                exclusive
                onChange={onFilterChange}
                aria-label="Media type filter"
                sx={{
                    width: {xs: "100%", sm: 300},
                    p: 0.5,
                    gap: 0.5,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,

                    "& .MuiToggleButtonGroup-grouped": {
                        border: 0,
                        borderRadius: 2,
                        width: "100%",
                        color: "text.secondary",
                        fontSize: "0.8rem",
                        textTransform: "none",
                        transition: "background-color 500ms ease, color 500ms ease, border-color 1000ms ease",

                        "&.Mui-selected": {
                            bgcolor: "#211819",
                            color: "secondary.main",
                            border: "1px solid",
                            borderColor: "secondary.dark",

                            "&:hover": {
                                bgcolor: "#2a1c1d",
                            },
                        },
                    },
                }}
            >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="movie">Movies</ToggleButton>
                <ToggleButton value="series">Series</ToggleButton>
            </ToggleButtonGroup>

            <Stack direction="row" flexWrap="wrap" gap={3}>
                {filteredMedia.map((item) => {
                    const originalIndex = media.findIndex(
                        (mediaItem) =>
                            mediaItem.id === item.id &&
                            mediaItem.media_type === item.media_type
                    );

                    return (
                        <Fade key={`${mediaTypeFilter}-${item.media_type}-${item.id}`} in timeout={500}>
                            <Box>
                                <MediaCard
                                    media={item}
                                    userMediaStatus={userMedia[originalIndex]?.userMedia.status}
                                />
                            </Box>
                        </Fade>
                    )
                })}
            </Stack>
        </Stack>
    );
}
