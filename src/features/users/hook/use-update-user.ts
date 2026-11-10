import { useState } from "react";
import useUserActionStore from "@/features/users/store/user-action-store";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";

interface Payload {
  body: FormData;
  userName: string;
}

export const updateUserApi = (data: Payload) =>
  httpClient.put(`/user/${data.userName}`, data.body, {
    headers: { "Content-Type": "multipart/form-data" },
  });

const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setState } = useUserActionStore();

  const mutation = useMutation({
    mutationFn: updateUserApi,
    mutationKey: ["update", "user"],
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

export default useUpdateUser;
