import { ApiError } from "@/services/api-error";
import type { ContactRequest, ContactResult } from "@/types/contact";
import type { NewsletterRequest, NewsletterResult } from "@/types/newsletter";

const MOCK_LATENCY_MS = 900;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Emails starting with "error@" return a server-side validation error so error states can be tested. */
const rejectTestEmail = (email: string, field: string) => {
  if (email.toLowerCase().startsWith("error@")) {
    throw new ApiError("validation", "One or more validation errors occurred.", {
      status: 400,
      fieldErrors: { [field]: ["This email address was rejected by the server (mock)."] },
    });
  }
};

export const mockApi = {
  async submitContact(payload: ContactRequest): Promise<ContactResult> {
    await wait(MOCK_LATENCY_MS);
    rejectTestEmail(payload.workEmail, "workEmail");
    return { id: `mock-${Date.now()}`, receivedAt: new Date().toISOString() };
  },

  async subscribeNewsletter(payload: NewsletterRequest): Promise<NewsletterResult> {
    await wait(MOCK_LATENCY_MS);
    rejectTestEmail(payload.email, "email");
    return { subscribed: true };
  },
};
