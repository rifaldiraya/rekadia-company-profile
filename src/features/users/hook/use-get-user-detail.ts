import httpClient from "@/utils/http-client";
import { useQuery } from "@tanstack/react-query";

export interface UserDetailApi {
  id: string;
  displayName: string;
  username: null | string;
  photo: null | string;
  email: string;
  roles: string[];
}

export const getUserDetailApi = (userName: string) =>
  httpClient.get<UserDetailApi>(`/user/${userName}`);

const useGetUserDetail = (username: string) =>
  useQuery({
    queryFn: () => getUserDetailApi(username),
    queryKey: ["user", "detail", username],
    enabled: !!username,
  });

export default useGetUserDetail;
