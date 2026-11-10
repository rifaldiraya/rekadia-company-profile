import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useChangePassword from "@/features/change-password/hook/use-change-password";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "@/features/change-password/schema/change-password-schema";

const useChangePasswordForm = () => {
  const { mutateAsync } = useChangePassword();

  const form = useForm<ChangePasswordSchema>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmationPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
    form.reset();
  });

  return { ...form, onSubmit };
};

export default useChangePasswordForm;
