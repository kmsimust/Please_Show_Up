import type { Route } from "./+types/create_event";
import { CreateEvent } from "../pages/create_event/create_event";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Create a event" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function CreateEventRoute() {
    return <CreateEvent />;
}