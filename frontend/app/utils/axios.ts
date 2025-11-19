// src/lib/axios.ts
import axios from "axios";
import { useAccessTokenWatcher } from "./auth-cookie";
import { useEffect } from "react";

// If you prefer a module-level instance:
export const api_instance = axios.create({
  baseURL: "http://localhost:8000",
});

// Attach token per request (hook version for components)
export const useAttachAxiosAuth = () => {
  const token = useAccessTokenWatcher();

  useEffect(() => {
    const id = api.interceptors.request.use((config) => {
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      } else if (config?.headers?.Authorization) {
        delete (config.headers as any).Authorization;
      }
      return config;
    });
    return () => api.interceptors.request.eject(id);
  }, [token]);
};
