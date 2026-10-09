import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from "axios";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme/theme.ts";
import {HomePage} from "./pages/HomePage.tsx";
import SideMenu from "./components/SideMenu/SideMenu.tsx";
import TopBar from "./components/TopBar.tsx";
import {useState} from "react";
import {collapsedDrawerWidth, drawerWidth, topBarHeight} from "./components/layoutConstants.ts";
import {SearchPage} from "./pages/SearchPage.tsx";

axios.defaults.baseURL = "http://localhost:3000";

const queryClient = new QueryClient()


function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme/>
                    <AppContent/>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

function AppContent() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TopBar open={open} onMenuClick={() => setOpen(!open)}/>
            <SideMenu open={open} setOpen={setOpen}/>

            <Box component="main"
                 sx={{
                     ml: {
                         xs: 5,
                         md: open ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`,
                     },
                     pt: `${topBarHeight}px`,
                     transition: "margin-left 0.2s",
                 }}
            >

                <Routes>
                    <Route path="/search" element={<SearchPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/" element={<Navigate to="/home"/>}/>
                </Routes>

            </Box>
        </>
    );
}

export default App
