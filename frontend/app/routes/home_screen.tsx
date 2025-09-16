import type { Route } from "./+types/home";
import { Home_screen } from '../pages/home_screen/home_screen';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Home_screen />;
}
