// src/components/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function ProtectedRoute({
  redirectTo = "/login",
}: {
  redirectTo?: string;
}) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (!isAuthenticated)
    return <Navigate to={redirectTo} state={{ from: location }} replace />;

  return <Outlet />;
}
