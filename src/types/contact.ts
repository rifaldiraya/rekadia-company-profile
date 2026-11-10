/** Page the enquiry was sent from, so the backend can route product leads. */
export type ContactSource =
  | "website-contact-page"
  | "website-product-e-office"
  | "website-product-e-office-email"
  | "website-product-delva";

/** Proposed payload for `POST /api/contact` (to be confirmed with the backend team). */
export interface ContactRequest {
  fullName: string;
  companyName: string;
  workEmail: string;
  whatsappNumber: string;
  source: ContactSource;
}

export interface ContactResult {
  id?: string;
  receivedAt?: string;
}
