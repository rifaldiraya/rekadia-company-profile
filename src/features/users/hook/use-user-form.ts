"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useCreateUser from "@/features/users/hook/use-create-user";
import useUpdateUser from "@/features/users/hook/use-update-user";
import {
  CreateUserSchema,
  createUserSchema,
} from "@/features/users/schema/create-user-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import useUserActionStore from "../store/user-action-store";

export default function useUserForm() {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const { state } = useUserActionStore();

  const getDefaultValues = (): CreateUserSchema =>
    state?.mode !== "assign-role"
      ? {
          displayName: state?.value?.displayName ?? "",
          email: state?.value?.email ?? "",
          userName: state?.value?.userName ?? "",
        }
      : { displayName: "", email: "", userName: "" };

  const form = useForm<CreateUserSchema>({
    defaultValues: getDefaultValues(),
    resolver: yupResolver(createUserSchema),
  });

  useEffect(() => {
    form.reset(getDefaultValues());
  }, [state]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!state) return;

    const formData = new FormData();

    formData.append("displayName", values.displayName);
    formData.append("userName", values.userName);
    formData.append("email", values.email);

    if (state.mode === "create") {
      await createUser.mutateAsync(formData);
    }

    if (state.mode === "update") {
      await updateUser.mutateAsync({
        body: formData,
        userName: values.userName,
      });
    }
  });

  return { ...form, onSubmit };
}
