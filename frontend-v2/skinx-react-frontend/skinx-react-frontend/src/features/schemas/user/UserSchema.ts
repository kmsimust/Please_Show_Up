/* eslint-disable import/prefer-default-export */

export interface UserSchema {
  id: string;
  email: string;
  name: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export type TUserView = Pick<
  UserSchema,
  "id" | "name" | "email" | "created_at" | "updated_at"
>;
