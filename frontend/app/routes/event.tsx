import type { Route } from "./+types/event";
import { EventPage } from "../pages/event/event";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login to Please show up system" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function EventRoute() {
  return <EventPage />;
}
