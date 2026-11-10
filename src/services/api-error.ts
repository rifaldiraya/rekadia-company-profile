import type { ApiErrorKind, ApiFieldErrors } from "@/types/api";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly fieldErrors: ApiFieldErrors;

  constructor(kind: ApiErrorKind, message: string, options: { status?: number; fieldErrors?: ApiFieldErrors } = {}) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = "ApiError";
    this.kind = kind;
    this.status = options.status;
    this.fieldErrors = options.fieldErrors ?? {};
  }

  get isUnreachable() {
    return this.kind === "network" || this.kind === "timeout";
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

/** "Email", "$.email" and "workEmail" all map to camelCase form field names. */
export const normalizeFieldName = (field: string) => {
  const name = field.replace(/^\$\./, "").split(".").pop() ?? field;
  return name.charAt(0).toLowerCase() + name.slice(1);
};

export const normalizeFieldErrors = (errors: ApiFieldErrors = {}): ApiFieldErrors =>
  Object.fromEntries(Object.entries(errors).map(([field, messages]) => [normalizeFieldName(field), messages]));

export const getErrorMessage = (error: unknown, fallback = "Something went wrong. Please try again.") => {
  if (!isApiError(error)) return fallback;
  if (error.isUnreachable) return "We couldn't reach our server. Please check your connection and try again.";
  return error.message || fallback;
};
