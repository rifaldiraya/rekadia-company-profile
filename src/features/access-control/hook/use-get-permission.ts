import httpClient from "@/utils/http-client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ActionEnum } from "@/config/access-control.config";

export interface IPermission {
  permissions: {
    type: string;
    values: ActionEnum[];
  }[];
}

const getPermissionApi = (role: string) =>
  httpClient.get<IPermission>(`/role/permissions/${role}`);

const useGetPermission = (role?: string) => {
  const [isLoadingEvery, setIsLoadingEvery] = useState(false);

  const query = useQuery({
    queryFn: async () => {
      setIsLoadingEvery(true);

      try {
        return await getPermissionApi(role!);
      } finally {
        setIsLoadingEvery(false);
      }
    },
    queryKey: ["permissions"],
    enabled: !!role,
  });

  return {
    isLoadingEvery,
    ...query,
  };
};

export default useGetPermission;
