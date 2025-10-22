import ProtectedRoute from "~/components/ProtectedRoutes";
import { FriendPage } from "../pages/friend/friend";

export default function Friend() {
  return (
      <>
        <ProtectedRoute>

          <FriendPage />
        </ProtectedRoute>
      </>
    );
}
