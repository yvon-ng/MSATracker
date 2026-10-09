import {Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {topBarHeight} from "../layoutConstants.ts";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import type {JSX} from "react";
import {useNavigate} from "react-router";

interface SideMenuContentProps {
    open: boolean;
    items:{text: string; icon: JSX.Element; url: string}[]
    handleDrawerClick: () => void;
}

export function SideMenuContent({open, items, handleDrawerClick}: SideMenuContentProps) {
    const navigate = useNavigate();

    const handleClick = (url: string) => {
        navigate(url);
    }

    return (
        <>
            <Box display="flex"
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
            <List>
                {items.map(({text, icon, url}) => (
                    <ListItem key={text}>
                        <ListItemButton
                            onClick={() => handleClick(url)}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                            }}
                        >
                            <ListItemIcon sx={{minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto'}}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{display: open ? "block" : "none"}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/*<Divider/>*/}
        </>
    )
}