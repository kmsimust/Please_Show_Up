import type { Route } from "./+types/home";
// import { redirect, Form, Link, type MetaFunction } from "react-router";
import { Profile } from '../pages/profile/profile';
// import { getUserId } from "~/components/session.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Profile />;
}
