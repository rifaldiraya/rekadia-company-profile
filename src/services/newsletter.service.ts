import { apiRequest } from "@/services/api-client";
import { API_ENDPOINTS } from "@/services/api-config";
import { mockApi } from "@/services/mock/mock-api";
import { withMockFallback } from "@/services/with-mock-fallback";
import type { NewsletterRequest, NewsletterResult } from "@/types/newsletter";

export const newsletterService = {
  subscribe(payload: NewsletterRequest, signal?: AbortSignal) {
    return withMockFallback(
      () =>
        apiRequest<NewsletterResult, NewsletterRequest>(API_ENDPOINTS.newsletter, {
          method: "POST",
          body: payload,
          signal,
        }),
      () => mockApi.subscribeNewsletter(payload),
    );
  },
};
