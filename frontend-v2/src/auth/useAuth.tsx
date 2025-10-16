// src/auth/useAuth.ts
import { useMemo } from "react";
import { useAccessTokenWatcher } from "../utils/auth-cookie";

export const useAuth = () => {
  const { token, ready } = useAccessTokenWatcher();
  const isAuthenticated = !!token;
  return useMemo(
    () => ({ isAuthenticated, loading: !ready, token }),
    [isAuthenticated, ready, token]
  );
};
