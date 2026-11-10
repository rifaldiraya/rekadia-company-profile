import * as yup from "yup";

export const forgotPasswordSchema = yup.object({
  email: yup.string().email().required(),
});

export type ForgotPasswordSchema = yup.InferType<typeof forgotPasswordSchema>;
