/* eslint-disable import/prefer-default-export */

import { UserSchema } from "../user/UserSchema";

export interface TCreatePost {
  title: string;
  content: string;
  tags: string;
}

export type Tag = {
  id: string;
  name: string;
}

export interface PostDetailSchema {
  user_id: string;
  user: UserSchema;
  title: string;
  content: string;
  tags: Tag[];
  id: string;
  created_at: string;
  updated_at: string;
}

export interface PostSchema {
  user_id: string;
  user: UserSchema;
  title: string;
  content?: string;
  tags: Tag[];
  id: string;
  created_at: string;
  updated_at: string;
}

export type TPostView = Pick<
  PostSchema,
  | "id"
  | "user_id"
  | "user"
  | "title"
  | "tags"
  | "created_at"
  | "updated_at"
>;
