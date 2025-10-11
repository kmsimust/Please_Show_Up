/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { TSignup } from "../../schemas/auth/SignupSchema";
import { TLogin } from "../../schemas/auth/LoginSchema";
import { TRefreshToken } from "../../schemas/auth/RefreshTokenSchema";
import { APIResponse } from "../../constants/type";
import api from "../../utils/api";
import { UserSchema } from "../../schemas/user/UserSchema";

export type SignupResponse = APIResponse<{
  success: boolean;
}>;

export type LoginResponse = APIResponse<{
  success: boolean;
  access_token: string;
  refresh_token: string;
}>;

export type RefreshTokenResponse = APIResponse<{
  success: boolean;
  access_token: string;
  refresh_token: string;
}>;

export type AuthMeResponse = APIResponse<{
  success: boolean;
  user: UserSchema;
}>;

export const signup = (body: TSignup): Promise<SignupResponse> => {
  return api.post("/v1/auth/register", body).then((res) => res.data);
};

export const login = (body: TLogin): Promise<LoginResponse> => {
  return api.post("/v1/auth/login", body).then((res) => res.data);
};

export const fetchUserData = (): Promise<AuthMeResponse> => {
  return api.get("/v1/auth/me").then((res) => res.data);
};

export const refreshToken = (body: TRefreshToken): Promise<RefreshTokenResponse> => {
  return api.patch("/v1/auth/refresh-token", body).then((res) => res.data);
};
