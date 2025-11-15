import type { Route } from "./+types/in_group";
import { InGroup } from "../pages/in_group/in_group";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Group Name" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function InGroupRoute() {
    return <InGroup />;
}