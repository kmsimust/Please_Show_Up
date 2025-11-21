import Cookies from "js-cookie";
import { getUser } from "~/utils/auth-me";
import { api_instance } from "~/utils/axios";

export async function get_friend_data() {
    let result = [];
    let error = undefined;

    try {
        // ✅ use cookie token first
        let token = Cookies.get("accessToken");
        const user = getUser();
        const user_id = user?.id;
        
        // ✅ API request
        const resp = await api_instance.get("api/get_friend_by_user_id/" + user_id, {
            headers: { Authorization: "Bearer " + token },
            // ❌ REMOVE withCredentials unless your backend requires cookies
            // withCredentials: true,
        });
        result = resp.data;
    } catch (err: any) {
        console.error("ERROR /me:", err);
        error = err.response?.data || "Failed to load friend.";
    }

    return { result, error };
}