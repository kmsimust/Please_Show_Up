import type { Route } from "./+types/home";
import { Pages_Home } from "../pages/home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome to Please show up" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomeRoute() {
  return <Pages_Home />;
}
