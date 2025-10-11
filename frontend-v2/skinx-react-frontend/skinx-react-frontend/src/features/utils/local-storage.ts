const AUTH_TOKEN_KEY = `sx.access_token`;
const REFRESH_TOKEN_KEY = `sx.refresh_token`;
const USER_KEY = `user`;

export const authTokenLocalStorage = {
  get: (): string | null => localStorage.getItem(AUTH_TOKEN_KEY),
  set: (value: string): void => localStorage.setItem(AUTH_TOKEN_KEY, value),
  remove: (): void => localStorage.removeItem(AUTH_TOKEN_KEY),
};

export const refreshTokenLocalStorage = {
  get: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),
  set: (value: string): void => localStorage.setItem(REFRESH_TOKEN_KEY, value),
  remove: (): void => localStorage.removeItem(REFRESH_TOKEN_KEY),
};

export const userLocalStorage = {
  get: (): string | null => localStorage.getItem(USER_KEY),
  set: (value: string): void => localStorage.setItem(USER_KEY, value),
  remove: (): void => localStorage.removeItem(USER_KEY),
};
