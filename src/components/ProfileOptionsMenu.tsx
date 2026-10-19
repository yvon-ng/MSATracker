import {useState} from "react";
import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {useLogOut} from "../hooks/UseAuth.ts";

export function ProfileOptionsMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const {logout, isLoggingOut} = useLogOut();

    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        handleMenuClose();
        await logout();
    };

    return (
        <>
            <IconButton
                aria-label="Profile options"
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <MoreVertIcon sx={{color: "text.secondary"}}/>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
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
                        sx: {p: 0},
                    },
                }}
            >
                <MenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    sx={{
                        px: 2,
                        py: 1.5,
                        color: "secondary.main",
                        "& .MuiSvgIcon-root": {
                            color: "secondary.main",
                            transition: "transform 500ms ease",
                        },
                        "& .MuiListItemText-root": {
                            transition: "transform 500ms ease",
                        },
                        "&:hover": {
                            bgcolor: "secondary.main",
                            color: "black",
                            "& .MuiListItemIcon-root": {
                                color: "black",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "black",
                                transform: "translateX(-3rem)",
                            },
                            "& .MuiListItemText-root": {
                                transform: "translateX(-1rem)",
                            },
                        },
                    }}
                >
                    <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Log out"/>
                </MenuItem>
            </Menu>
        </>
    );
}
