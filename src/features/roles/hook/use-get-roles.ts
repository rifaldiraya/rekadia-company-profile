import httpClient from "@/utils/http-client";
import { useQuery } from "@tanstack/react-query";

export interface IRoles {
  name: string;
}

export const getRolesApi = () => httpClient.get<IRoles[]>("/role");

export default function useGetRoles() {
  return useQuery({
    queryFn: getRolesApi,
    queryKey: ["roles"],
  });
}
