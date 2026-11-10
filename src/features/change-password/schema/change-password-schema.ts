import * as yup from "yup";

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required(),
  newPassword: yup.string().min(8).required(),
  confirmationPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword")],
      "New password confirmation must match with your new password",
    ),
});

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>;
