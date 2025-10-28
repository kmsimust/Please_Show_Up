import type { Route } from "./+types/login";
import { LoginPage } from "../pages/login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login to Please show up system" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LoginRoute() {
  return <LoginPage />;
}
