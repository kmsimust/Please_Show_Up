import type { Route } from "./+types/signup";
import { SignUpPage } from "../pages/signup/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign up" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function SignUp() {
  return <SignUpPage />;
}
