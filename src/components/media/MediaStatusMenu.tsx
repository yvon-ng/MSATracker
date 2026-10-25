import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import {useState} from "react";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import AddIcon from "@mui/icons-material/Add";

import type {UserMediaStatus} from "../../model/UserMedia.ts";
import {usePersonalPreferences} from "../../hooks/UsePersonalPreferences.ts";
import {useAddMediaToList} from "../../hooks/UseUserMedia.ts";
import {UserAuth} from "../../context/AuthContextProvider.tsx";

interface MediaStatusMenuProps {
    tmdbId: number;
    mediaType: "movie" | "tv";
    status?: UserMediaStatus;
    sx?: SxProps<Theme>;
    fontSize?: number
}

export function MediaStatusMenu({
                                    tmdbId,
                                    mediaType,
                                    status,
                                    sx,
                                    fontSize
                                }: MediaStatusMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const {personalPreferences} = usePersonalPreferences();
    const {user} = UserAuth();
    const {addMediaToList} = useAddMediaToList();

    const handleStatusChange = (newStatus: UserMediaStatus) => {
        if (!user) return;

        addMediaToList({
            userId: user.userId,
            tmdbId,
            mediaType: mediaType === "movie" ? "movie" : "series",
            status: newStatus,
        });

        setAnchorEl(null);
    };

    const menuItems = [
        {
            status: "watchlist" as const,
            label: "Add to Watchlist",
            icon: <BookmarkBorderOutlinedIcon fontSize="small"/>,
        },
        {
            status: "currently_watching" as const,
            label: "Set as Currently Watching",
            icon: <OndemandVideoOutlinedIcon fontSize="small"/>,
        },
        {
            status: "completed" as const,
            label: "Mark as Completed",
            icon: <CheckOutlinedIcon fontSize="small"/>,
        },
    ];

    const StatusIcon =
        status === "watchlist"
            ? BookmarkBorderOutlinedIcon
            : status === "currently_watching"
                ? OndemandVideoOutlinedIcon
                : status === "completed"
                    ? CheckOutlinedIcon
                    : AddIcon;

    return (
        <>
            <IconButton
                size="small"
                aria-label={"Change media status"}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
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
                    ...sx,
                }}
            >
                <StatusIcon sx={{fontSize: fontSize}}/>
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
                        },
                    },
                    list: {
                        sx: {
                            p: 0.5,
                            display: "flex",
                            flexDirection: personalPreferences.showExtraLabels
                                ? "column"
                                : "row",
                        },
                    },
                }}
            >
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.status}
                        onClick={() => handleStatusChange(item.status)}
                        sx={{
                            px: personalPreferences.showExtraLabels ? 2 : 1,
                            border: "1px solid transparent",
                            transition:
                                "background-color 250ms ease, color 250ms ease",
                            "&:hover": {
                                bgcolor: "#211819",
                                color: "secondary.main",
                                border: "1px solid",
                                borderColor: "secondary.dark",
                                borderRadius: 2,
                            },
                            "&:hover .MuiListItemIcon-root": {
                                color: "secondary.main",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: personalPreferences.showExtraLabels
                                    ? 40
                                    : 0,
                                justifyContent: personalPreferences.showExtraLabels
                                    ? "flex-start"
                                    : "center",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        {personalPreferences.showExtraLabels && (
                            <ListItemText primary={item.label}/>
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}