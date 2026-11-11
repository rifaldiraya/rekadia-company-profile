/** Payload for `POST /newsletter` (backend Swagger: `SubscribeNewsletterRequest`). */
export interface NewsletterRequest {
  email: string;
  language: "en" | "id";
}

export interface NewsletterResult {
  subscribed: boolean;
}
