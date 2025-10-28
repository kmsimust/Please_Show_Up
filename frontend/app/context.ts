import {createContext} from "react-router";
import { UserType } from "app/types/user"

export const userContext = createContext<UserType | null>(null);