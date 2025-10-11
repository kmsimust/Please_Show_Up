/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from "react-query";
import { signup, SignupResponse as _SignupResponse } from "./api-action";

export type SignupResponse = _SignupResponse;
const useSignup = () => {
  return useMutation(signup);
};

export default useSignup;
