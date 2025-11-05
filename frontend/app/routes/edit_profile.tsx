import type { Route } from "./+types/edit_profile";
import { EditProfilePage } from "../pages/edit_account/edit_profile";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "My profile" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function EPRoute() {
    return <EditProfilePage />;
}
