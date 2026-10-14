import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from "axios";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme/theme.ts";
import {HomePage} from "./pages/HomePage.tsx";
import {SearchPage} from "./pages/SearchPage.tsx";
import {MovieDetailPage} from "./pages/MovieDetailPage.tsx";
import {SeriesDetailPage} from "./pages/SeriesDetailPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {AuthContextProvider} from "./context/AuthContextProvider.tsx";
import PublicLayout from "./layouts/PublicLayout.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import AppLayout from "./layouts/AppLayout.tsx";

axios.defaults.baseURL = "http://localhost:3000";

const queryClient = new QueryClient()


function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthContextProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline enableColorScheme/>
                        <AppContent/>
                    </ThemeProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

function AppContent() {

    return (
        <>
            <Routes>
                {/* Public routes */}
                <Route element={<PublicLayout/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                </Route>

                {/* Authenticated pages */}
                <Route element={<ProtectedRoute/>}>
                    <Route element={<AppLayout/>}>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/series/:mediaId" element={<SeriesDetailPage/>}/>
                        <Route path="/movie/:mediaId" element={<MovieDetailPage/>}/>
                        <Route path="/search" element={<SearchPage/>}/>
                    </Route>
                </Route>

                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="*" element={<Navigate to="/home" replace/>}/>
            </Routes>
        </>
    );
}

export default App
