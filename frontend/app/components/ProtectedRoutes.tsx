import { Cookies, useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router";


const ProtectedRoute = () => {
    const token = useCookies(['accessToken']);

    return (
        token ? <Outlet/>: <Navigate to="/login"/>
    )
}

export default ProtectedRoute
