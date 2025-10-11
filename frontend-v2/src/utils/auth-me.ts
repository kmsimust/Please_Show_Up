import Cookies from "js-cookie";

const USER_KEY = "user";

import { useEffect, useState } from "react";

export const useUserWatcher = () => {
  const [user, setuser] = useState(Cookies.get("user"));

  useEffect(() => {
    const interval = setInterval(() => {
      const current = Cookies.get("user");
      setuser((prev) => (prev !== current ? current : prev));
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, []);

  return user;
};

// Set token (default 7 days expiration)
export const setUser = (token: string) => {
  Cookies.set(USER_KEY, token, { expires: 7, sameSite: 'strict' });
};

// Get token
export const getUser = (): string | undefined => {
  return Cookies.get(USER_KEY);
};

// Remove token
export const removeUser = () => {
  Cookies.remove(USER_KEY);
};