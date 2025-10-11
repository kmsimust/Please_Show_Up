/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from "react-query";
import {
  refreshToken,
  RefreshTokenResponse as _RefreshTokenResponse,
} from "./api-action";

export type RefreshTokenResponse = _RefreshTokenResponse;

const useRefreshToken = () => {
  return useMutation(refreshToken);
};

export default useRefreshToken;
