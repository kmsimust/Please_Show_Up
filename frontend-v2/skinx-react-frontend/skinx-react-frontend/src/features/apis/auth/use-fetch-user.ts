/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useQuery } from "react-query";
import { fetchUserData } from "./api-action";

const useFetchUser = () => {
  return useQuery(["user"], () => fetchUserData(), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: false,
  });
};

export default useFetchUser;
