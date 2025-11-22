import Cookies from "js-cookie";
import axios from "axios";
import type { AvailableDateUpdateStatus } from "~/types/available_date";

export async function get_available_date_by_event_id(event_id: number) {
    let result = [];
    let error = undefined;

    try {
        let token = Cookies.get("accessToken");

        const resp = await axios.get(
            "http://localhost:8000/api/get_available_date_by_event_id/" + event_id,
            {
                headers: { Authorization: "Bearer " + token },
            }
        );

        result = resp.data;
    } catch (err: any) {
        console.error("ERROR at get_available_date_by_event_id:", err);
        error = err.response?.data || "Failed to load available dates.";
    }

    return { result, error };
}

export async function update_status(available_date_id: number, body: AvailableDateUpdateStatus) {
    let result = null;
    let error = undefined;

    try {
        let token = Cookies.get("accessToken");

        const resp = await axios.patch(
            "http://localhost:8000/api/update_status/" + available_date_id,
            body,
            {
                headers: { Authorization: "Bearer " + token },
            }
        );

        result = resp.data;
    } catch (err: any) {
        console.error("ERROR at update_status:", err);
        error = err.response?.data || "Failed to update status.";
    }

    return { result, error };
}
