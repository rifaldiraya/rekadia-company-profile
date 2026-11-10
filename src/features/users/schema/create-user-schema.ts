import * as yup from "yup";

export const createUserSchema = yup.object({
  email: yup.string().required(),
  displayName: yup.string().required(),
  userName: yup.string().required(),
});

export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
