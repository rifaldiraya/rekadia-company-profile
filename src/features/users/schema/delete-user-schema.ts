import * as yup from "yup";

export const deleteUserSchema = yup.object({
  username: yup.string().required(),
});

export type DeleteUserSchema = yup.InferType<typeof deleteUserSchema>;
