import * as Joi from "joi";

export interface TRefreshToken {
  refresh_token: string | null;
}

const initialValues: TRefreshToken = {
  refresh_token: "",
};

export const validationSchema = Joi.object({
  refresh_token: Joi.string().required(),
});

export default initialValues;
