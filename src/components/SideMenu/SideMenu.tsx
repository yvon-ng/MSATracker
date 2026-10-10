import {
    Box, Drawer,
} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {collapsedDrawerWidth, drawerWidth} from "../layoutConstants.ts";
import {SideMenuContent} from "./SideMenuContent.tsx";

interface SideMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function SideMenu({open, setOpen}: SideMenuProps) {
    const handleDrawerClick = () => {
        setOpen(!open);
    };

    const items = [
        {text: 'Home', icon: <HomeOutlinedIcon/>, url: 'home'},
        {text: 'Watchlist', icon: <BookmarkBorderOutlinedIcon/>, url: 'watchlist'},
        {text: 'Completed', icon: <CheckOutlinedIcon/>, url: 'completed'},
    ];

    return (
        <Box display={"flex"}>
            {/*Mobile Drawer*/}
            <Drawer
                variant="temporary"
                open={open}
                onClose={() => setOpen(false)}
                ModalProps={{
                    disableScrollLock: true,
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundImage: "none",
                    },
                }}
            >
                <SideMenuContent open={open} items={items} handleDrawerClick={handleDrawerClick} />
            </Drawer>

            {/*Desktop Drawer*/}
            <Drawer variant="permanent" open={open}
                    sx={{
                        display: { xs: "none", md: "block" },
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
                <SideMenuContent open={open} items={items} handleDrawerClick={handleDrawerClick} />
            </Drawer>
        </Box>
    );
}