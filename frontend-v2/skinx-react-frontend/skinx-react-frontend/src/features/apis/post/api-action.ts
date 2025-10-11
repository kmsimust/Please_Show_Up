/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { APIResponse } from '../../constants/type';
import api from '../../utils/api';
import {
  PostDetailSchema,
  PostSchema,
  Tag,
  TCreatePost,
} from '../../schemas/post/PostSchema';
import { SortType } from '../../constants/enum';

export type CreatePostResponse = APIResponse<{
  success: boolean;
  post: PostSchema;
}>;

export type FetchPostTagsResponse = APIResponse<{
  success: boolean;
  tags: Tag[];
}>;

export type FetchPostsResponse = APIResponse<{
  success: boolean;
  posts: PostSchema[];
  total: number;
}>;

export type FetchPostResponse = APIResponse<{
  success: boolean;
  post: PostDetailSchema;
}>;

export const createPost = (body: TCreatePost): Promise<CreatePostResponse> => {
  return api.post('/v1/post', body).then((res) => res.data);
};

export const fetchPostTags = (): Promise<FetchPostTagsResponse> => {
  return api.get(`/v1/post/tags`).then((res) => res.data);
};

export const fetchPosts = (
  skip: number,
  limit: number,
  keyword: string,
  sort: SortType
): Promise<FetchPostsResponse> => {
  return api
    .get(`/v1/post?skip=${skip}&limit=${limit}&keyword=${keyword}&sort=${sort}`)
    .then((res) => res.data);
};

export const fetchPostById = (postId: string): Promise<FetchPostResponse> => {
  return api.get(`/v1/post/${postId}`).then((res) => res.data);
};
