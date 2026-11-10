import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const deleteRoleApi = (name: string) => httpClient.delete(`/role/${name}`);

export default function useDeleteRole() {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: deleteRoleApi,
    mutationKey: ["delete-role"],
    onMutate: (res) => {
      setIsLoading(true);

      return res;
    },
    onSettled: (res) => {
      setIsLoading(false);

      return res;
    },
  });

  return {
    ...mutation,
    isLoading,
  };
}
