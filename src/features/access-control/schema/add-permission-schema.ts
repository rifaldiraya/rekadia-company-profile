import * as yup from "yup";

export const permissionSchema = yup.object({
  roleName: yup.string().required(),
  claims: yup
    .array()
    .of(
      yup.object({
        type: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .min(1)
    .required(),
});

export type PermissionSchema = yup.InferType<typeof permissionSchema>;
