import { ResetPasswordSchema } from "@/features/reset-password/schema/reset-password-schema";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";

export const resetPasswordApi = (body: ResetPasswordSchema) =>
  httpClient.post("/account/reset-password", body);

export default function useResetPassword() {
  return useMutation({
    mutationFn: resetPasswordApi,
    mutationKey: ["reset-password"],
  });
}
