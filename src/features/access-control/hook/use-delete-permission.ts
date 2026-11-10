import { PermissionSchema } from "@/features/access-control/schema/add-permission-schema";
import httpClient from "@/utils/http-client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const deletePermissionApi = (body: PermissionSchema) =>
  httpClient.post("/role/permission/delete", body);

const useDeletePermission = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: deletePermissionApi,
    mutationKey: ["add", "permission"],
    onMutate: (res) => {
      setIsLoading(true);

      return res;
    },
    onSettled: (res) => {
      setIsLoading(false);

      return res;
    },
  });

  return { isLoading, ...mutation };
};

export default useDeletePermission;
