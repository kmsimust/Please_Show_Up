import type { Route } from "./+types/notification";
import { NotificationsPage } from "../pages/notification/notification";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "My profile" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function NotifRoute() {
    return <NotificationsPage />;
}
