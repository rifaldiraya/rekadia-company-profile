import * as yup from "yup";

export const assignRoleSchema = yup.object({
  userName: yup.string().required(),
  roles: yup
    .array()
    .of(yup.string())
    .min(1, "User has atleast one role")
    .required(),
});

export type AssignRoleSchema = yup.InferType<typeof assignRoleSchema>;
