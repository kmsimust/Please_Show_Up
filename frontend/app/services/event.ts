import Cookies from "js-cookie";
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
