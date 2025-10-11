import { atom } from "recoil";
import { UserSchema } from "../schemas/user/UserSchema";

// Example atom for storing user data
export const userState = atom<UserSchema | null>({
  key: "userState",
  default: null, // Initial value
});
