import type { Route } from "./+types/test";

import { Test } from "../pages/test/test"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test page2" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AboutRoute() {
    return <Test />;
}
