import type { Event } from "./event";
import type { GroupMember } from "./group_member";

export interface AvailableDate {
    id: number;
    event: Event;
    group_member: GroupMember;
    date: string; // Date in YYYY-MM-DD format
    status: "yes" | "no" | "maybe";
    created_at: string;
}

export interface AvailableDateCreate {
    event: number;
    group_member: number;
    date: string;
    status: "yes" | "no" | "maybe";
}

export interface AvailableDateUpdateStatus {
    status: "yes" | "no" | "maybe";
}
