import {
    Box, Drawer, IconButton, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography,
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {collapsedDrawerWidth, drawerWidth, topBarHeight} from "./layoutConstants.ts";

interface SideMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function SideMenu({open, setOpen}: SideMenuProps) {
    const handleDrawerClick = () => {
        setOpen(!open);
    };

    const items = [
        {text: 'Home', icon: <HomeOutlinedIcon/>},
        {text: 'Watchlist', icon: <BookmarkBorderOutlinedIcon/>},
        {text: 'Completed', icon: <CheckOutlinedIcon/>},
    ];

    return (
        <Box sx={{display: 'flex'}}>
            <Drawer variant="permanent" open={open}
                    sx={{
                        width: open ? drawerWidth : collapsedDrawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: open ? drawerWidth : collapsedDrawerWidth,
                            boxSizing: 'border-box',
                            transition: 'width 0.2s',
                            overflowX: 'hidden',
                        },
                    }}
            >
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
                    {items.map(({text, icon}) => (
                        <ListItem key={text}>
                            <ListItemButton
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
            </Drawer>
        </Box>
    );
}