/* eslint-disable @typescript-eslint/no-explicit-any */

export type APIResponse<Custom = { [key: string]: any }> =
  | ({
      success: true;
    } & Custom)
  | {
      success: false;
      error: string;
      error_code: number;
    };
