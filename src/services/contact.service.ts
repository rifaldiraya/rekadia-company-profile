import { apiRequest } from "@/services/api-client";
import { API_ENDPOINTS } from "@/services/api-config";
import { mockApi } from "@/services/mock/mock-api";
import { withMockFallback } from "@/services/with-mock-fallback";
import type { ContactRequest, ContactResult } from "@/types/contact";

export const contactService = {
  submit(payload: ContactRequest, signal?: AbortSignal) {
    return withMockFallback(
      () =>
        apiRequest<ContactResult, ContactRequest>(API_ENDPOINTS.contact, {
          method: "POST",
          body: payload,
          signal,
        }),
      () => mockApi.submitContact(payload),
    );
  },
};
