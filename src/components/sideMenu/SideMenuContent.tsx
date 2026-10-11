import {Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {topBarHeight} from "../layoutConstants.ts";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import type {JSX} from "react";
import {useLocation, useNavigate} from "react-router";

interface SideMenuContentProps {
    open: boolean;
    items: { text: string; icon: JSX.Element; url: string }[]
    handleDrawerClick: () => void;
}

export function SideMenuContent({open, items, handleDrawerClick}: SideMenuContentProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (url: string) => {
        navigate(url);
    }

    const activeIndex = items.findIndex(
        ({url}) => location.pathname === `/${url}`
    );

    return (
        <>
            <Box
                display="flex"
                justifyContent={open ? "end" : "center"}
                alignItems="center"
                height={topBarHeight}
                mr={open ? 2 : 0}
                mb={3}
            >
                <IconButton onClick={handleDrawerClick}>
                    {open ? <ChevronLeftIcon/> : <MenuIcon/>}
                </IconButton>
            </Box>
            <Typography variant="caption" color="textSecondary" ml={3} sx={{letterSpacing: '0.15em'}}
                        display={open ? 'block' : 'none'}>
                LIBRARY
            </Typography>
            <Box sx={{position: "relative"}}>
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
            {/*<Divider/>*/}
        </>
    )
}