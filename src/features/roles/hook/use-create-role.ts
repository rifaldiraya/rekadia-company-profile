import { CreateRoleSchema } from "@/features/roles/schema/create-role-schema";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export const createRoleApi = (body: CreateRoleSchema) => httpClient.post("/role", body);

export default function useCreateRole() {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: createRoleApi,
    mutationKey: ["add-role"],
    onMutate: (res) => {
      setIsLoading(true);

      return res;
    },
    onSettled: (res) => {
      setIsLoading(false);

      return res;
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data, { variant: "error" });

      return error;
    },
  });

  return {
    ...mutation,
    isLoading,
  };
}
