import { API_BASE_URL, API_TIMEOUT_MS } from "@/services/api-config";
import { ApiError, normalizeFieldErrors } from "@/services/api-error";
import type { ApiResponse, ProblemDetails } from "@/types/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  signal?: AbortSignal;
  timeoutMs?: number;
  headers?: Record<string, string>;
}

const parseBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return undefined;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("json")) return text;
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError("parse", "The server returned an invalid response.", { status: response.status });
  }
};

const toHttpError = (status: number, body: unknown) => {
  const problem = (typeof body === "object" && body !== null ? body : {}) as ProblemDetails & { message?: string };
  const fieldErrors = normalizeFieldErrors(problem.errors);
  const message = problem.detail ?? problem.message ?? problem.title ?? `Request failed with status ${status}.`;
  const kind = Object.keys(fieldErrors).length > 0 || status === 400 || status === 422 ? "validation" : "http";
  return new ApiError(kind, message, { status, fieldErrors });
};

/**
 * Minimal JSON client for the ASP.NET Core API. Accepts either a raw payload or the
 * `{ success, message, data }` envelope and always resolves to the unwrapped data.
 */
export async function apiRequest<TData, TBody = unknown>(
  path: string,
  { method = "GET", body, signal, timeoutMs = API_TIMEOUT_MS, headers }: RequestOptions<TBody> = {},
): Promise<TData> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new DOMException("Timeout", "TimeoutError")), timeoutMs);
  const abortFromCaller = () => controller.abort(signal?.reason);
  signal?.addEventListener("abort", abortFromCaller, { once: true });

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (controller.signal.aborted && !signal?.aborted) {
      throw new ApiError("timeout", "The request timed out.");
    }
    if (signal?.aborted) throw error;
    throw new ApiError("network", "Unable to reach the server.");
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abortFromCaller);
  }

  const payload = await parseBody(response);
  if (!response.ok) throw toHttpError(response.status, payload);

  if (typeof payload === "object" && payload !== null && "success" in payload) {
    const envelope = payload as ApiResponse<TData>;
    if (!envelope.success) {
      throw new ApiError("http", envelope.message ?? "The request was not successful.", { status: response.status });
    }
    return envelope.data as TData;
  }
  return payload as TData;
}
