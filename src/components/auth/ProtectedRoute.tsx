import {Navigate, Outlet, useLocation} from "react-router";
import {UserAuth} from "../../context/AuthContextProvider.tsx";
import {CircularProgress} from "@mui/material";

export default function ProtectedRoute() {
    const {user, supabaseUser, loading} = UserAuth();
    const location = useLocation();

    if (loading) {
        return <CircularProgress />; // Replace with a loading spinner if desired.
    }

    if (!supabaseUser || !user) {
        return (
            <Navigate to="/login" replace state={{from: location}}/>
        );
    }

    return <Outlet/>;
}
