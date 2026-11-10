/** Envelope the frontend expects from successful ASP.NET Core responses. */
export interface ApiResponse<TData> {
  success: boolean;
  message?: string;
  data?: TData;
}

/** Field name -> messages, as produced by ASP.NET Core model validation. */
export type ApiFieldErrors = Record<string, string[]>;

/** RFC 7807 problem details (ASP.NET Core `ProblemDetails` / `ValidationProblemDetails`). */
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  traceId?: string;
  errors?: ApiFieldErrors;
}

export type ApiErrorKind = "network" | "timeout" | "validation" | "http" | "parse";
