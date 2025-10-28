//import ProtectedRoute from "~/components/ProtectedRoutes";
import type { Route } from "./+types/friend";
import { FriendPage } from "../pages/friend/friend";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My friend list" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function FriendRoute() {
  return <FriendPage />;
}
