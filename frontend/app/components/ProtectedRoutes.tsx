import { Outlet, Navigate } from "react-router";

const ProtectedRoute = () => {
    const token = "Token"

    return (
        token ? <Outlet/>: <Navigate to="/login"/>
    )
}

export default ProtectedRoute
