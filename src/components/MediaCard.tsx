import {
    Box,
    Card,
    CardHeader,
    CardMedia,
    Chip,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type {TMDBMedia} from "../model/TMDBMedia.ts";
import {IMAGE_BASE_URL} from "../services/tmdbServices.ts";

interface MediaCardProps {
    tmdbMedia: TMDBMedia
}

export function MediaCard({tmdbMedia}: MediaCardProps) {
    const isMovie = tmdbMedia.media_type === "movie";
    const title = isMovie ? tmdbMedia.title : tmdbMedia.name;
    const releaseDate = isMovie ? tmdbMedia.release_date : tmdbMedia.first_air_date;
    const poster = tmdbMedia.poster_path ? `${IMAGE_BASE_URL}${tmdbMedia.poster_path}` : `https://www.content.numetro.co.za/ui_images/no_poster.png`; //TODO better no poster picture
    const year = releaseDate?.slice(0, 4);

    return (
        <Card
            sx={{
                width: {xs: "100%", sm: "35%", md: 300},
                bgcolor: "background.default",
                backgroundImage: "none",
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={poster}
                    alt={title ?? "Unknown title"}
                    sx={{
                        width: "100%",
                        aspectRatio: "2 / 3",
                        objectFit: "cover",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                    }}
                />

                <Chip
                    label={tmdbMedia.media_type}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        borderRadius: 2,
                        bgcolor: "background.paper",
                        textTransform: "capitalize",
                    }}
                />

                <IconButton
                    size="small"
                    aria-label={`Add ${title ?? "title"}`}
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "text.secondary",
                        color: "text.secondary",
                        transition: "background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease",
                        "&:hover": {
                            bgcolor: "secondary.main",
                            color: "primary.main",
                            borderColor: "secondary.main",
                        },
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Box>

            <CardHeader
                title={title}
                subheader={year}
                slotProps={{
                    title: { variant: "subtitle1" },
                    subheader: { variant: "caption" },
                }}
                sx={{ p: 1.5, bgcolor: "background.default" }}
            />
        </Card>
    );
}