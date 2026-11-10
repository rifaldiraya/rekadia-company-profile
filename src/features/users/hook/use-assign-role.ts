import { AssignRoleSchema } from "@/features/users/schema/assign-role-schema";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";

export const assignRoleApi = (body: AssignRoleSchema) =>
  httpClient.post("/user/assign-role", body);

const useAssignRole = () =>
  useMutation({
    mutationFn: assignRoleApi,
    mutationKey: ["assign-role"],
  });

export default useAssignRole;
