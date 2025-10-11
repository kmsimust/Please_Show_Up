import ProtectedRoute from "~/components/ProtectedRoutes";
import { Pages_Friend } from "../pages/friend/friend";

export default function Friend() {
  return (
      <>
        <ProtectedRoute>

          <Pages_Friend />
        </ProtectedRoute>
      </>
    );
}
