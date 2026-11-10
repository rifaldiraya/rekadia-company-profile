import { ChangePasswordSchema } from "@/features/change-password/schema/change-password-schema";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";

const changePasswordApi = (body: ChangePasswordSchema) =>
  httpClient.post("/account/change-password", body);

const useChangePassword = () => useMutation({
  mutationFn: changePasswordApi,
  mutationKey: ["change-password"],
});

export default useChangePassword;
