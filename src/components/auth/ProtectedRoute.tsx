import {Navigate, Outlet, useLocation} from "react-router";
import {UserAuth} from "../../context/AuthContextProvider.tsx";

export default function ProtectedRoute() {
    const {user, loading} = UserAuth();
    const location = useLocation();

    if (loading) {
        return null; // Replace with a loading spinner if desired.
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{from: location}}
            />
        );
    }

    return <Outlet/>;
}
