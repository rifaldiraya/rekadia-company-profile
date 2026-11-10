export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api").replace(
  /\/+$/,
  "",
);

/** Proposed endpoints, relative to API_BASE_URL. Adjust here once the .NET API is finalised. */
export const API_ENDPOINTS = {
  contact: "/contact",
  newsletter: "/newsletter",
} as const;

export const API_TIMEOUT_MS = 15_000;

export type ApiMockMode = "always" | "never" | "fallback";

const resolveMockMode = (): ApiMockMode => {
  const flag = process.env.NEXT_PUBLIC_USE_API_MOCK?.trim().toLowerCase();
  if (flag === "true") return "always";
  if (flag === "false") return "never";
  return process.env.NODE_ENV === "production" ? "never" : "fallback";
};

export const API_MOCK_MODE = resolveMockMode();
