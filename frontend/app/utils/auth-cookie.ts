// src/utils/auth-cookie.ts
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";

const ACCESS_TOKEN_KEY = "accessToken";
const AUTH_EVENT = "auth:token-change";

export const setAccessToken = (token: string | null, days = 7) => {
  if (token) {
    Cookies.set(ACCESS_TOKEN_KEY, token, { expires: days, sameSite: "strict" });
  } else {
    Cookies.remove(ACCESS_TOKEN_KEY);
  }
  // notify listeners (no native cookie event)
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: { token } }));
};

export const getAccessToken = (): string | null => 
  Cookies.get(ACCESS_TOKEN_KEY) ?? null;

//export const removeaccesstokrn
/**
 * Watch the access token. Returns { token, ready }.
 * - ready is true immediately after the first synchronous read
 * - updates instantly when setAccessToken() is used
 * - optional 1s polling fallback for code paths that don't call setAccessToken()
 */
export const useAccessTokenWatcher = () => {
  const [token, setToken] = useState<string | null>(() => getAccessToken());
  const [ready, setReady] = useState<boolean>(true); // ready immediately
  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      setToken(detail.token ?? getAccessToken());
      setReady(true)
    };
    window.addEventListener(AUTH_EVENT, onChange);

    // optional fallback polling if other code bypasses setAccessToken()
    pollRef.current = window.setInterval(() => {
      const current = getAccessToken();
      setToken((prev) => (prev !== current ? current : prev));
      setReady(true)
    }, 1000);

    return () => {
      window.removeEventListener(AUTH_EVENT, onChange);
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, []);

  return { token, ready };
};
