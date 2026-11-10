import * as yup from "yup";

export const signInSchema = yup.object({
  emailOrUserName: yup.string().trim().required("Enter your email or username"),
  password: yup.string().required("Enter your password"),
});

export interface SignInSchema extends yup.InferType<typeof signInSchema> {}
