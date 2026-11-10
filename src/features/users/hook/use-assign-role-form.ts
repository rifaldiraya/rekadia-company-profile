import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useUserActionStore from "@/features/users/store/user-action-store";
import {
  AssignRoleSchema,
  assignRoleSchema,
} from "@/features/users/schema/assign-role-schema";
import useAssignRole from "@/features/users/hook/use-assign-role";
import { yupResolver } from "@hookform/resolvers/yup";

const useAssignRoleForm = () => {
  const assignRole = useAssignRole();
  const { state } = useUserActionStore();

  const form = useForm<AssignRoleSchema>({
    defaultValues: {
      userName: state?.value?.userName ?? "",
      roles: [],
    },
    resolver: yupResolver(assignRoleSchema),
  });

  useEffect(() => {
    form.reset({
      userName: state?.value?.userName ?? "",
      roles: [],
    });
  }, [state]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (!state) return;

    if (state.mode === "assign-role") {
      await assignRole.mutateAsync(values);
    }
  });

  return { ...form, onSubmit };
};

export default useAssignRoleForm;
