import { DeleteUserSchema } from "@/features/users/schema/delete-user-schema";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const deleteUserApi = ({ username }: DeleteUserSchema) =>
  httpClient.delete(`/user/${username}`);

const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: deleteUserApi,
    mutationKey: ["user", "delete"],
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
};

export default useDeleteUser;
