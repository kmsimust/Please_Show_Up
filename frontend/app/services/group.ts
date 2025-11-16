import Cookies from "js-cookie";
import axios from "axios";
import { getUser } from "~/utils/auth-me";

export async function get_group() {
    let result = [];
    let error = undefined;

    try {
        // ✅ use cookie token first
        let token = Cookies.get("accessToken");
        const user = getUser();
        const user_id = user?.id;

        // ✅ API request
        const resp = await axios.get("http://localhost:8000/api/get_group_by_user_id/" + user_id, {
            headers: { Authorization: "Bearer " + token },
            // ❌ REMOVE withCredentials unless your backend requires cookies
            // withCredentials: true,
        });
        result = resp.data;
    } catch (err: any) {
        console.error("ERROR at get_group:", err);
        error = err.response?.data || "Failed to load profile.";
    }
    return {result, error};
}