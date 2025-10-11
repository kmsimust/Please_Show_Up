import * as Joi from "joi";

export interface TSignup {
  name: string;
  email: string;
  password: string;
}

const initialValues: TSignup = {
  name: "",
  email: "",
  password: "",
};

export const validationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default initialValues;
