import * as yup from "yup";

export const createRoleSchema = yup.object({
  roleName: yup
    .string()
    .typeError("Name must be string")
    .required("Name is required field"),
});

export type CreateRoleSchema = yup.InferType<typeof createRoleSchema>;
