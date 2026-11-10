import { createUserSchema } from "@/features/users/schema/create-user-schema";
import * as yup from "yup";

export const updateUserSchema = createUserSchema;
export type UpdateUserSchema = yup.InferType<typeof updateUserSchema>;
