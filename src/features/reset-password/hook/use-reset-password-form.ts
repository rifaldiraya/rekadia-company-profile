import { useForm } from "react-hook-form";
import useResetPassword from "@/features/reset-password/hook/use-reset-password";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/features/reset-password/schema/reset-password-schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface IUseResetPasswordForm {
  email?: string;
  token?: string;
}

export default function useResetPasswordForm({
  email,
  token,
}: IUseResetPasswordForm) {
  const { mutateAsync } = useResetPassword();

  const form = useForm<ResetPasswordSchema>({
    defaultValues: {
      email: email ?? "",
      token: token ?? "",
      password: "",
      confirmationPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
    form.reset();
  });

  return { ...form, onSubmit };
}
