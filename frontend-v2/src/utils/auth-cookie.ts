import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";

import { useEffect, useState } from "react";

export const useAccessTokenWatcher = () => {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  useEffect(() => {
    const interval = setInterval(() => {
      const current = Cookies.get("accessToken");
      setAccessToken((prev) => (prev !== current ? current : prev));
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, []);

  return accessToken;
};

// Set token (default 7 days expiration)
export const setAccessToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 7, sameSite: 'strict' });
};

// Get token
export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

// Remove token
export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};