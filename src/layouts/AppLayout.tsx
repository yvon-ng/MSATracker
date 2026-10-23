import {Outlet} from "react-router";
import {Box} from "@mui/material";
import {useState} from "react";
import TopBar from "../components/navigation/TopBar.tsx";
import SideMenu from "../components/navigation/SideMenu";

import {
    collapsedDrawerWidth,
    drawerWidth,
    topBarHeight,
} from "../components/layoutConstants";

export default function AppLayout() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TopBar open={open} onMenuClick={() => setOpen(!open)} onSearchOpen={() => setOpen(false)}/>
            <SideMenu open={open} setOpen={setOpen}/>

            <Box
                component="main"
                sx={{
                    pl: {
                        xs: 5,
                        md: open
                            ? `${drawerWidth}px`
                            : `${collapsedDrawerWidth}px`,
                    },
                    pt: `${topBarHeight}px`,
                    transition: "margin-left 0.2s",
                }}
            >
                <Outlet/>
            </Box>
        </>
    );
}