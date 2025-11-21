import Cookies from "js-cookie";
import axios from "axios";
import type { GroupRequestCreate } from "~/types/group_request";
import { api_instance } from "~/utils/axios";

export async function get_invitation_by_group_id(group_id: number) {
    let result = [];
    let error = undefined;

    try {
        // ✅ use cookie token first
        let token = Cookies.get("accessToken");
        // ✅ API request
        const resp = await api_instance.get("/api/get_invitation_by_group_id/" + group_id, {
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

export async function create_group_request(body: GroupRequestCreate) {
    let result = {};
    let error = undefined;

    try {
        // ✅ use cookie token first
        let token = Cookies.get("accessToken");
        // ✅ API request
        const resp = await api_instance.post("/api/create_group_request", body, {
            headers: { Authorization: "Bearer " + token },
            // ❌ REMOVE withCredentials unless your backend requires cookies
            // withCredentials: true,
        });
        result = resp.data;
    } catch (err: any) {
        console.error("ERROR at create_group_request:", err);
        error = err.response?.data || "Failed to load create_group_request.";
    }
    return {result, error};
}