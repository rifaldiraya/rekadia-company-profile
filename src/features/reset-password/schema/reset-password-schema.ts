import * as yup from "yup";

export const resetPasswordSchema = yup.object({
  email: yup.string().required(),
  token: yup.string().required(),
  password: yup.string().min(8).required(),
  confirmationPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Confirmation password must be equal to password",
    ),
});

export type ResetPasswordSchema = yup.InferType<typeof resetPasswordSchema>;
