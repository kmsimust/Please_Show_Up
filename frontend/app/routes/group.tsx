import type { Route } from "./+types/group";
import { GroupPage } from "../pages/group/group";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "My Group" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function AboutRoute() {
    return <GroupPage />;
}
