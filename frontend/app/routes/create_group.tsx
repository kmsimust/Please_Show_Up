import type { Route } from "./+types/create_group";
import { CreateGroup } from "../pages/create_group/create_group";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Create a group" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function CreateGroupRoute() {
    return <CreateGroup />;
}