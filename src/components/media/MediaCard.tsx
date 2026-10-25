import {
    Card, CardActionArea,
    CardHeader,
    CardMedia,
    Chip,
} from "@mui/material";
import type {TMDBMedia} from "../../model/TMDBMedia.ts";
import {IMAGE_BASE_URL} from "../../services/tmdbServices.ts";
import {useNavigate} from "react-router";
import type {UserMediaStatus} from "../../model/UserMedia.ts";
import {MediaStatusMenu} from "./MediaStatusMenu.tsx";
import {NO_POSTER_URL} from "../../utils/utils.ts";

interface MediaCardProps {
    media: TMDBMedia
    userMediaStatus?: UserMediaStatus
}

export function MediaCard({media, userMediaStatus}: MediaCardProps) {
    const navigate = useNavigate();
    const isMovie = media.media_type === "movie";
    const title = isMovie ? media.title : media.name;
    const releaseDate = isMovie ? media.release_date : media.first_air_date;
    const poster = media.poster_path ? `${IMAGE_BASE_URL}${media.poster_path}` : NO_POSTER_URL;
    const year = releaseDate?.slice(0, 4);

    return (
        <Card
            sx={{
                position: "relative", // anchor for the absolutely positioned button
                width: {xs: "100%", sm: "35%", md: 300},
                bgcolor: "background.default",
                backgroundImage: "none",
            }}
        >
            <CardActionArea
                onClick={() => navigate(`/${isMovie ? "movie" : "series"}/${media.id}`)}>
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
                    label={isMovie ? "movie" : "series"}
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

                <CardHeader
                    title={title}
                    subheader={year}
                    slotProps={{
                        title: {
                            variant: "subtitle1",
                            noWrap: true,
                        },
                        subheader: {variant: "caption"},
                    }}
                    sx={{
                        p: 1.5,
                        bgcolor: "background.default",
                        "& .MuiCardHeader-content": {
                            minWidth: 0,
                        },
                    }}
                />
            </CardActionArea>

            <MediaStatusMenu
                tmdbId={media.id}
                mediaType={media.media_type}
                status={userMediaStatus}
                sx={{
                    position: "absolute",
                    bottom: "5.5rem",
                    right: "1rem",
                }}
            />
        </Card>
    );
}