import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import {AuthContext} from "../../context/AuthContext.ts";

export default function ProtectedRoute() {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return null; // Replace with a loading spinner if desired.
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
}
