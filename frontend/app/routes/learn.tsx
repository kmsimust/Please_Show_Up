import type { Route } from "./+types/learn";
import LearnPage from "../pages/learn/learn";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Welcome to Please show up" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function LearnRoute() {
    return <LearnPage />;
}
