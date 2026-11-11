import { BASE_URL } from "@/constants";
import axios from "axios";
import { getSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";

/**
 * Creates an axios instance with a default base URL and auth token.
 * Automatically injects the user's access token into the Authorization header.
 * If the user is not signed in, the token will not be included in the request.
 *
 * Automatically handles 401 errors by redirecting the user to the sign-in page.
 * For all other errors, it will display a snackbar with the error message.
 *
 * @returns {axios.AxiosInstance} The axios instance.
 */
const httpClient = () => {
  const defaultOptions = {
    baseURL: BASE_URL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/sign-in";
      } else {
        const data = error.response?.data;
        // ProblemDetails `errors` is `{ field: string[] }`; older endpoints send `[{ message }]`.
        const messages: string[] = Array.isArray(data?.errors)
          ? data.errors.map((item: { message?: string }) => item.message ?? "")
          : Object.values<string[]>(data?.errors ?? {}).flat();
        const errorMessage = messages.filter(Boolean).join(", ") || data?.detail || "Something went wrong";
        enqueueSnackbar({
          message: errorMessage,
          variant: "error",
        });
      }

      throw error;
    },
  );

  return instance;
};

export default httpClient();
