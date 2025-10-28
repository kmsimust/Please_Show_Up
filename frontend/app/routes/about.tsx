import type { Route } from "./+types/about";
import { AboutUsPage } from "../pages/about_us/about_us";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome to Please show up" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AboutRoute() {
  return <AboutUsPage />;
}
