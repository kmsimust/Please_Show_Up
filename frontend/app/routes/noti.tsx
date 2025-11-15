import type { Route } from "./+types/noti";
import { Noti } from "../pages/noti/noti";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "notification" },
        { name: "notification", content: "Welcome to React Router!" },
    ];
}

export default function AboutRoute() {
    return <Noti />;
}
