import { useState } from "react";
import useUserActionStore from "@/features/users/store/user-action-store";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";

export const createUserApi = (body: FormData) =>
  httpClient.post("user", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setState } = useUserActionStore();

  const mutation = useMutation({
    mutationFn: createUserApi,
    mutationKey: ["create", "user"],
    onMutate: (res) => {
      setIsLoading(true);

      return res;
    },
    onSettled: (res) => {
      setIsLoading(false);

      return res;
    },
    onSuccess: () => {
      setState(null);
    },
  });

  return {
    isLoading,
    ...mutation,
  };
};

export default useCreateUser;
