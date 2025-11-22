import type { Route } from "./+types/edit_group";
import { EditGroup } from "../pages/edit_group/edit_group";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Edit Group" },
        { name: "description", content: "Edit your group settings" },
    ];
}

export default function EditGroupRoute() {
    return <EditGroup />;
}
