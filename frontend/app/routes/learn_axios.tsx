import type { Route } from "./+types/learn_axios";
import LearnAxiosPage from "~/pages/learn_axios/learn_axios";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Learn axios page" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function LearnRoute() {
    return <LearnAxiosPage />;
}
