/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useQuery } from 'react-query';
import {
  fetchPosts,
  FetchPostsResponse as _FetchPostsResponse,
} from './api-action';
import { SortType } from '../../constants/enum';

export type FetchPostsResponse = _FetchPostsResponse;

const useFetchPosts = (
  skip: number,
  limit: number,
  keyword: string,
  sort: SortType
) => {
  return useQuery(
    [skip, limit, keyword, sort],
    () => fetchPosts(skip, limit, keyword, sort),
    { refetchOnWindowFocus: false, cacheTime: 3600 }
  );
};

export default useFetchPosts;
