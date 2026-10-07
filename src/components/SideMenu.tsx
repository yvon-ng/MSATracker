import {
    Box, Divider, Drawer, IconButton, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography,
} from "@mui/material";
import {useState} from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';

export default function SideMenu() {
    const drawerWidth = 250;
    const [open, setOpen] = useState(true);

    const handleDrawerClick = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <Drawer variant="permanent" open={open}
                    sx={{
                        width: open ? drawerWidth : 64,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: open ? drawerWidth : 64,
                            boxSizing: 'border-box',
                            transition: 'width 0.2s',
                            overflowX: 'hidden',
                        },
                    }}
            >
                <Box display={"flex"} justifyContent={open ? "end" : "center"} mr={open ? 2 : 0} my={6}>
                    <IconButton onClick={handleDrawerClick}>
                        {open ? <ChevronLeftIcon/> : <MenuIcon/>}
                    </IconButton>
                </Box>
                <List>
                    {['Home', 'Watchlist', 'Completed'].map((text) => (
                        <ListItem key={text} disablePadding sx={{display: 'block', py: 1}}>
                            <ListItemButton
                                sx={[{minHeight: 48, px: 2.5,},
                                    open ? {justifyContent: 'initial',} : {justifyContent: 'center',},
                                ]}
                            >
                                <ListItemIcon
                                    sx={[{minWidth: 0, justifyContent: 'center',}, open ? {mr: 3,} : {mr: 'auto',},]}>
                                    <InboxIcon/>
                                </ListItemIcon>
                                <ListItemText primary={text} sx={[open ? {opacity: 1,} : {opacity: 0,}]}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
            </Drawer>

            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Typography sx={{marginBottom: 2}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography sx={{marginBottom: 2}}>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box>
        </Box>
    );
}