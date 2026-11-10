import * as yup from "yup";

export const signInSchema = yup.object({
  emailOrUserName: yup.string().required(),
  password: yup.string().required(),
});

export interface SignInSchema extends yup.InferType<typeof signInSchema> {}
