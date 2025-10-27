// src/components/routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function PublicRoute({
  children,
  redirectTo = "/",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;
  return <>{children}</>;
}
