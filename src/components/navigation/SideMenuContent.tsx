import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {topBarHeight} from "../layoutConstants.ts";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import type {JSX} from "react";
import {useLocation, useNavigate} from "react-router";
import {UserAuth} from "../../context/AuthContextProvider.tsx";
import {ProfileAvatar} from "../ProfileAvatar.tsx";
import {usePersonalPreferences} from "../../hooks/UsePersonalPreferences.ts";

interface SideMenuContentProps {
    open: boolean;
    items: { text: string; icon: JSX.Element; url: string }[]
    handleDrawerClick: () => void;
    onNavigate?: () => void;
}

export function SideMenuContent({open, items, handleDrawerClick, onNavigate}: SideMenuContentProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = UserAuth();
    const {personalPreferences} = usePersonalPreferences();

    const handleClick = (url: string) => {
        navigate(url);
        onNavigate?.();
    }

    const activeIndex = items.findIndex(
        ({url}) => location.pathname === `/${url}`
    );
    const isProfileActive = location.pathname === "/profile";


    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"} sx={{overflowX: "hidden"}}>
            <Box display="flex" mb={3} alignItems="center" height={topBarHeight} mr={open ? 2 : 0}
                 justifyContent={open ? "end" : "center"}>
                <IconButton onClick={handleDrawerClick}>
                    {open ? <ChevronLeftIcon sx={{color: "text.disabled"}}/> :
                        <MenuIcon sx={{color: "text.disabled"}}/>}
                </IconButton>
            </Box>
            <Typography variant="caption" color="textSecondary" ml={3} letterSpacing={"0.15em"}
                        display={open ? 'block' : 'none'}>
                LIBRARY
            </Typography>
            <Box
                sx={{
                    position: "relative",
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                }}
            >
                {activeIndex !== -1 && (
                    <Box
                        sx={{
                            position: "absolute",
                            right: 10,
                            top: open ? 30 : 38,
                            width: 3,
                            height: open ? 30 : 15,
                            borderRadius: 2,
                            bgcolor: "secondary.main",
                            transform: `translateY(${activeIndex * 72}px)`,
                            transition: "transform 300ms ease, height 200ms ease",
                            zIndex: 1,
                            pointerEvents: "none",
                        }}
                    />
                )}

                <List>
                    {items.map(({text, icon, url}) => (
                        <ListItem key={text} disablePadding sx={{py: 1}}>
                            <ListItemButton
                                onClick={() => handleClick(url)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                    "&:hover .menu-icon": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    className="menu-icon"
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        display: "flex",
                                        alignItems: "center",
                                        minWidth: 0,
                                        justifyContent: 'center',
                                        mr: open ? 3 : 'auto',
                                        borderRadius: "50%",
                                        transition: "background-color 0.2s ease",

                                        ...(location.pathname === `/${url}` && {
                                            color: open ? "secondary.main" : "none",
                                        }),
                                    }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{
                                    display: open ? "block" : "none",

                                    ...(location.pathname === `/${url}` && {
                                        color: open ? "secondary.main" : "none",
                                    }),

                                }}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Bottom section */}
            <Box sx={{flexShrink: 0}} position={"relative"} my={1}>
                <Divider sx={{display: "block", mx: 2}}/>
                {/*TODO maybe better way so it has transition*/}
                {isProfileActive && (
                    <Box
                        sx={{
                            position: "absolute",
                            right: 10,
                            mr: open ? 0 : -0.5,
                            top: open ? 20 : 25,
                            width: 3,
                            height: open ? 30 : 20,
                            borderRadius: 2,
                            bgcolor: "secondary.main",
                            zIndex: 1,
                            pointerEvents: "none",
                        }}
                    />
                )}
                <ListItemButton
                    onClick={() => handleClick("profile")}
                    aria-label="Profile"
                    sx={{
                        px: 2,
                        mt: 1,
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <Box sx={{mr: open ? 3 : "auto", flexShrink: 0}}>
                        <ProfileAvatar size={35}/>
                    </Box>

                    <ListItemText
                        className="menu-text"
                        primary={personalPreferences?.usernameAsDisplayName ? user?.username : user?.firstName}
                        sx={{
                            display: open ? "block" : "none",
                            "& .MuiListItemText-primary": {
                                fontWeight: 500,
                                transition: "color 0.2s ease",
                                color: isProfileActive ? "secondary.main" : "primary.main"
                            },
                            "&:hover .MuiListItemText-primary": {
                                color: "secondary.main",
                            },
                        }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    )
}