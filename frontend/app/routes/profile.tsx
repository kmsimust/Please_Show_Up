import type { Route } from "./+types/edit_profile";
import { ProfilePage } from "../pages/profile/profile";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "My profile" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function AboutRoute() {
    return <ProfilePage />;
}
