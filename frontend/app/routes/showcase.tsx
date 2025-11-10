import type { Route } from "./+types/showcase";
import { Pages_Showcase } from "../pages/showcase/showcase";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome to Please show up" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomeRoute() {
  return <Pages_Showcase />;
}
