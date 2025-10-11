import * as Joi from "joi";

export interface TLogin {
  email: string;
  password: string;
}

const initialValues: TLogin = {
  email: "",
  password: "",
};

export const validationSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default initialValues;
