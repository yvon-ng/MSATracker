import {
    Card, CardActionArea,
    CardHeader,
    CardMedia,
    Chip,
    IconButton, ListItemIcon, ListItemText, Menu, MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type {TMDBMedia} from "../../model/TMDBMedia.ts";
import {IMAGE_BASE_URL} from "../../services/tmdbServices.ts";
import {useNavigate} from "react-router";
import {useAddMediaToWatchlist} from "../../hooks/UseMedia.ts";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import {useState} from "react";
import {UserAuth} from "../../context/AuthContextProvider.tsx";

interface MediaCardProps {
    media: TMDBMedia
}

export function MediaCard({media}: MediaCardProps) {
    const navigate = useNavigate();
    const isMovie = media.media_type === "movie";
    const title = isMovie ? media.title : media.name;
    const releaseDate = isMovie ? media.release_date : media.first_air_date;
    const poster = media.poster_path ? `${IMAGE_BASE_URL}${media.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original`; //TODO better no poster picture
    const year = releaseDate?.slice(0, 4);
    const {addMediaToWatchlist} = useAddMediaToWatchlist();
    const {user} = UserAuth();

    const handleAddToWatchlist = (media: TMDBMedia) => {
        if (!user) return;

        // TODO: double check everything

        addMediaToWatchlist({
            userId: user.userId,
            tmdbId: media.id,
            mediaType: media.media_type === "movie" ? "movie" : "series",
            status: "watchlist",
        });
    };

    const handleAddToCurrentlyWatching = (media: TMDBMedia) => {
        if (!user) return;

        // TODO: doesnt work

        addMediaToWatchlist({
            userId: user.userId,
            tmdbId: media.id,
            mediaType: media.media_type === "movie" ? "movie" : "series",
            status: "currently watching",
        });
    };

    const handleMarkCompleted = (media: TMDBMedia) => {
        if (!user) return;

        // TODO: double check everything

        addMediaToWatchlist({
            userId: user.userId,
            tmdbId: media.id,
            mediaType: media.media_type === "movie" ? "movie" : "series",
            status: "completed",
        });
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleClose = () => setAnchorEl(null);

    const handleAction = (action: (media: TMDBMedia) => void) => {
        handleClose();
        action(media);
    };


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
                        title: {variant: "subtitle1"},
                        subheader: {variant: "caption"},
                    }}
                    sx={{p: 1.5, bgcolor: "background.default"}}
                />
            </CardActionArea>

            <IconButton
                size="small"
                aria-label={`Options for ${title}`}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                    position: "absolute",
                    bottom: "calc(100% - 27rem)",
                    right: "1rem",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "text.secondary",
                    color: "text.secondary",
                    transition: "background-color 0.3s, color 0.3s",
                    "&:hover": {
                        bgcolor: "secondary.main",
                        color: "primary.main",
                        borderColor: "secondary.main",
                    },
                }}
            >
                <AddIcon/>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 3,
                        sx: {
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 2,
                            // minWidth: 200,
                        },
                    },
                    list: {sx: {p: 0.5}},
                }}
            >
                <MenuItem onClick={() => handleAction(handleAddToWatchlist)}>
                    <ListItemIcon>
                        <BookmarkBorderOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Add to Watchlist"/>
                </MenuItem>

                <MenuItem onClick={() => handleAction(handleMarkCompleted)}>
                    <ListItemIcon>
                        <CheckOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Mark as Completed"/>
                </MenuItem>

                <MenuItem onClick={() => handleAction(handleAddToCurrentlyWatching)}>
                    <ListItemIcon>
                        <PlaylistAddOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Add to List"/>
                </MenuItem>
            </Menu>
        </Card>
    );
}