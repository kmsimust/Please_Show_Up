import Cookies from "js-cookie";
import axios from "axios";
import { api_instance } from "~/utils/axios";
import type { EventCreate } from "~/types/event";

export async function create_event(body: EventCreate) {
  let result: any = null;
  let error: any = null;

  try {
    const token = Cookies.get("accessToken");

    const resp = await api_instance.post("/api/create_event/", body, {
      headers: token ? { Authorization: "Bearer " + token } : {},
    });

    result = resp.data;
  } catch (err: any) {
    console.error("ERROR at create_event:", err);
    error = err?.response?.data || "Failed to create event.";
  }

  return { result, error };
}

export async function get_event_info(event_id: number) {
  let result = null;
  let error = undefined;

  try {
    let token = Cookies.get("accessToken");

    const resp = await axios.get(
      "http://localhost:8000/api/get_event_info/" + event_id,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    result = resp.data;
  } catch (err: any) {
    console.error("ERROR at get_event_info:", err);
    error = err.response?.data || "Failed to load event.";
  }

  return { result, error };
}

export async function get_event_by_group_id(group_id: number) {
  let result = [];
  let error = undefined;

  try {
    // ✅ use cookie token first
    let token = Cookies.get("accessToken");

    // ✅ API request
    const resp = await axios.get(
      "http://localhost:8000/api/get_event_by_group_id/" + group_id,
      {
        headers: { Authorization: "Bearer " + token },
        // ❌ REMOVE withCredentials unless your backend requires cookies
        // withCredentials: true,
      }
    );

    result = resp.data;
  } catch (err: any) {
    console.error("ERROR at get_event_by_group_id:", err);
    error = err.response?.data || "Failed to load events.";
  }

  return { result, error };
}

export async function update_event_date(event_id: number, event_date: string) {
  let result = null;
  let error = undefined;

  try {
    let token = Cookies.get("accessToken");

    const resp = await axios.patch(
      "http://localhost:8000/api/update_event_date/" + event_id,
      { event_date },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    result = resp.data;
  } catch (err: any) {
    console.error("ERROR at update_event_date:", err);
    error = err.response?.data || "Failed to update event date.";
  }

  return { result, error };
}
