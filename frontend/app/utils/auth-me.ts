import Cookies from "js-cookie";

import type { UserType } from "../types/user";

const USER_KEY = "user";

// Watch cookie updates every 1s
import { useEffect, useState } from "react";

export const useUserWatcher = () => {
  const [user, setUser] = useState<UserType | null>(() => getUser());

  useEffect(() => {
    const interval = setInterval(() => {
      const current = getUser();
      setUser((prev) => {
        const prevStr = JSON.stringify(prev);
        const currStr = JSON.stringify(current);
        return prevStr !== currStr ? current : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return user;
};

// ✅ Set user to cookies (7 days)
export const setUser = (value: UserType) => {
  Cookies.set(USER_KEY, JSON.stringify(value), {
    expires: 7,
    sameSite: "strict",
  });
};

// ✅ Get user from cookies and parse safely
export const getUser = (): UserType | null => {
  const user = Cookies.get(USER_KEY);
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    // Fallback if corrupted cookie
    return null;
  }
};

// ✅ Remove user cookie
// remove cookie is kinda similar to this
export const removeUser = () => {
  Cookies.remove(USER_KEY);
};