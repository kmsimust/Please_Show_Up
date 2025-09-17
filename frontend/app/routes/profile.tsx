import type { Route } from "./+types/home";
import { Profile } from '../pages/profile/profile';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Profile />;
}