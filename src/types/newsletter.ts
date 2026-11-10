/** Proposed payload for `POST /api/newsletter` (to be confirmed with the backend team). */
export interface NewsletterRequest {
  email: string;
  language: "en" | "id";
}

export interface NewsletterResult {
  subscribed: boolean;
}
