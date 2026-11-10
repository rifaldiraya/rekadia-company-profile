import { useForm } from "react-hook-form";
import useCreateRole from "@/features/roles/hook/use-create-role";
import {
  CreateRoleSchema,
  createRoleSchema,
} from "@/features/roles/schema/create-role-schema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useRoleForm(callback: () => void) {
  const { mutateAsync } = useCreateRole();

  const form = useForm<CreateRoleSchema>({
    defaultValues: {
      roleName: "",
    },
    resolver: yupResolver(createRoleSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
    await callback();
    form.reset();
  });

  return { ...form, onSubmit };
}
