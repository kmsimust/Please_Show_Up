import { selector } from "recoil";
import { userState } from "../states/user-state";

// Example selector to get user's full name
export const userNameSelector = selector({
  key: "userNameSelector",
  get: ({ get }) => {
    const user = get(userState);
    return user;
  },
});
