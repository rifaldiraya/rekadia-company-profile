export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dev.rkdweb.apps-dev.rekadia.co.id").replace(
  /\/+$/,
  "",
);

/** Endpoints relative to API_BASE_URL, as documented in the backend Swagger (`/swagger/index.html`). */
export const API_ENDPOINTS = {
  contact: "/contact",
  newsletter: "/newsletter",
  login: "/account/login",
  refreshToken: "/account/refresh-token",
  logout: "/account/logout",
  cmsCollections: "/cms/collections",
  cmsMedia: "/cms/media",
  cmsResource: (resource: string) => `/cms/${resource}`,
} as const;

/** Largest `pageSize` the API accepts. */
export const API_MAX_PAGE_SIZE = 100;

export const API_TIMEOUT_MS = 15_000;

export type ApiMockMode = "always" | "never" | "fallback";

const resolveMockMode = (): ApiMockMode => {
  const flag = process.env.NEXT_PUBLIC_USE_API_MOCK?.trim().toLowerCase();
  if (flag === "true") return "always";
  if (flag === "false") return "never";
  return process.env.NODE_ENV === "production" ? "never" : "fallback";
};

export const API_MOCK_MODE = resolveMockMode();
