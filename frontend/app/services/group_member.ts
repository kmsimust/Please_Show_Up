import Cookies from "js-cookie";
import axios from "axios";

export async function get_group_member(group_id: number) {
    let result = [];
    let error = undefined;

    try {
        // ✅ use cookie token first
        let token = Cookies.get("accessToken");
        // ✅ API request
        const resp = await axios.get("http://localhost:8000/api/get_all_member_by_group_id/" + group_id, {
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