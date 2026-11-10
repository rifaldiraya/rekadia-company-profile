import { useForm } from "react-hook-form";
import useForgotPassword from "@/features/forgot-password/hook/use-forgot-password";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from "@/features/forgot-password/schema/forgot-password-schema";
import { yupResolver } from "@hookform/resolvers/yup";

const useForgotPasswordForm = () => {
  const { mutateAsync } = useForgotPassword();

  const form = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
    form.reset();
  });

  return { ...form, onSubmit };
};

export default useForgotPasswordForm;
