import type { Route } from "./+types/101_home";
import { AboutUsPage } from "../pages/about_us/about_us";
import NavbarUnauth from "~/components/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <AboutUsPage />
    </>
  );
}
