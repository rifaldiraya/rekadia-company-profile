import { ForgotPasswordSchema } from "@/features/forgot-password/schema/forgot-password-schema";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";

const forgotPasswordApi = (body: ForgotPasswordSchema) =>
  httpClient.post("/account/forgot-password", body);

const useForgotPassword = () => useMutation({
  mutationFn: forgotPasswordApi,
  mutationKey: ["forgot-password"],
});

export default useForgotPassword;
