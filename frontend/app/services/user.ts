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

export async function update_user_profile(userId: number | string, file: File) {
    let result: any = null;
    let error = undefined;
    
    try {
        const token = Cookies.get("accessToken");
        if (!token) {
            throw new Error("No authentication token found");
        }

        const fd = new FormData();
        fd.append("profile_image", file);

        console.log("Uploading profile image:", {
            userId,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
        });

        const response = await axios.patch(
            "http://localhost:8000/api/update_user_profile_image/" + userId,
            fd,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        console.log("Profile image upload response:", response.data);
        result = response.data;
    } catch (err: any) {
        console.error("ERROR /update_user_profile:", err);
        console.error("Error details:", {
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
            message: err.message,
        });
        error = err.response?.data || err.message || "failed to upload profile image";
    }
    
    return { result, error };
}

export async function update_user_banner(userId: number | string, file: File) {
    let result: any = null;
    let error = undefined;
    
    try {
        const token = Cookies.get("accessToken");
        if (!token) {
            throw new Error("No authentication token found");
        }

        const fd = new FormData();
        fd.append("banner", file);

        console.log("Uploading banner:", {
            userId,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
        });

        const response = await axios.patch(
            "http://localhost:8000/api/update_user_banner_image/" + userId + "/",
            fd,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        console.log("Banner upload response:", response.data);
        result = response.data;
    } catch (err: any) {
        console.error("ERROR /update_user_banner:", err);
        console.error("Error details:", {
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
            message: err.message,
        });
        error = err.response?.data || err.message || "failed to upload banner image";
    }
    
    return { result, error };
}