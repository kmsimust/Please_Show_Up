import { redirect, useLocation } from "react-router";
import { useAuth } from "~/auth/useAuth";
import { userSession } from "~/types/userCookie";

import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";

export async function authMiddleware2({ request }, next) {
    const { isAuthenticated, loading } = useAuth();
    const response = await next();
    //const location = useLocation();

    if (loading) return <div style={{ padding: 24 }}>Loading…</div>;

    if (!isAuthenticated) {
        throw redirect("/login");
    } else {
        console.log("Alreay login");
        return response;
    }
}

/*export async function loader() {
  return null;
}*/

export async function authMiddleware({ request }, next) {
    console.log(`${new Date().toISOString()} ${request.method} ${request.url}`);
    const start = performance.now();
    const response = await next();
    const duration = performance.now() - start;
    console.log(
        `${new Date().toISOString()} Response ${response.status} (${duration}ms)`,
    );
    const cookieHeader = request.headers.get("Cookie");
    const session = (await userSession.parse(cookieHeader)) || {};
    console.log(cookieHeader);

    return response;
}
