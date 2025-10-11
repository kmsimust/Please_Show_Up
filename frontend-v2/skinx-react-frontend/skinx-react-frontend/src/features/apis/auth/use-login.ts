/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from "react-query";
import { login, LoginResponse as _LoginResponse } from "./api-action";

export type LoginResponse = _LoginResponse;
const useLogin = () => {
  return useMutation(login);
};

export default useLogin;
