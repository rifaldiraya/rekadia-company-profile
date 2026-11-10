import * as yup from "yup";

export const userSchema = yup.object({
  displayName: yup.string().required(),
  email: yup.string().required(),
  id: yup.string().required(),
  photo: yup.string().nullable(),
  userName: yup.string().required(),
});

export type UserSchema = yup.InferType<typeof userSchema>;
