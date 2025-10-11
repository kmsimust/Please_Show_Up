/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useQuery } from "react-query";
import {
  fetchPostById,
  FetchPostResponse as _FetchPostResponse,
} from "./api-action";

export type FetchPostResponse = _FetchPostResponse;

const useFetchPostById = (
  postId: string,
) => {
  return useQuery([postId], () => fetchPostById(postId), {
    refetchOnWindowFocus: false,
    cacheTime: 3600,
  });
};

export default useFetchPostById;
