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
import {useAddMediaToList} from "../../hooks/UseUserMedia.ts";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {useState} from "react";
import {UserAuth} from "../../context/AuthContextProvider.tsx";
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

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
    const {addMediaToList} = useAddMediaToList();
    const {user} = UserAuth();

    const handleAddToWatchlist = () => {
        if (!user) return;

        addMediaToList({
            userId: user.userId,
            tmdbId: media.id,
            mediaType: media.media_type === "movie" ? "movie" : "series",
            status: "watchlist",
        });

        setAnchorEl(null)
    };

    const handleAddToCurrentlyWatching = () => {
        if (!user) return;

        // TODO: check if media is already in watchlist if yes, update that record, else create new UserMedia (and media if doesnt exist yet) with started_at and added_at now()

        addMediaToList({
            userId: user.userId,
            tmdbId: media.id,
            mediaType: media.media_type === "movie" ? "movie" : "series",
            status: "currently_watching",
        });

        setAnchorEl(null)

    };

    const handleMarkCompleted = () => {
        if (!user) return;

        // TODO: works but when already in watchlist should update existing record not create new one, same with currently watching, if media not yet in those 2 create new UserMedia (and media if doesnt exist yet) with started_at, added_at and completed_at now()

        addMediaToList({
            userId: user.userId,
            tmdbId: media.id,
            mediaType: media.media_type === "movie" ? "movie" : "series",
            status: "completed",
        });
        setAnchorEl(null)
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

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

            <IconButton
                size="small"
                aria-label={`Options for ${title}`}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                    position: "absolute",
                    bottom: "5.5rem",
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
                onClose={() => setAnchorEl(null)}
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
                <MenuItem onClick={handleAddToWatchlist}>
                    <ListItemIcon>
                        <BookmarkBorderOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Add to Watchlist"/>
                </MenuItem>

                <MenuItem onClick={handleAddToCurrentlyWatching}>
                    <ListItemIcon>
                        <OndemandVideoOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Set as Currently Watching"/>
                </MenuItem>

                <MenuItem onClick={handleMarkCompleted}>
                    <ListItemIcon>
                        <CheckOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Mark as Completed"/>
                </MenuItem>

            </Menu>
        </Card>
    );
}