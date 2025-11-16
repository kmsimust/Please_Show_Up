import Cookies from "js-cookie";
import axios from "axios";
import { getUser } from "~/utils/auth-me";

export async function get_user_data() {
    let result = [];
    let error = undefined;

    try {
        // ✅ use cookie token first
        let token = Cookies.get("accessToken");
        // ✅ API request
        const resp = await axios.get("http://localhost:8000/api/user/me/", {
            headers: { Authorization: "Bearer " + token },
            // ❌ REMOVE withCredentials unless your backend requires cookies
            // withCredentials: true,
        });
        result = resp.data;
    } catch (err: any) {
        console.error("ERROR /me:", err);
        error = err.response?.data || "Failed to load profile.";
    }
    return { result, error };
}

export async function update_user(formData: any) {
    let result = {};
    let error = undefined;
    try{
        let token = Cookies.get("accessToken");
        const userObj = getUser();
        const response = await axios.put(
        "http://localhost:8000/api/user/update_user/" + userObj?.id,
        formData,
        { headers: { Authorization: "Bearer " + token } },
    );
    result = response.data
    }
    
    catch (err: any){
        console.error("ERROR /update_user", err);
        error = err.response?.data || "fialed to update profile";

    }
    return {result, error}
    
}
