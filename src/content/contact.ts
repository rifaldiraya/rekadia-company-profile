import { IMAGES } from "@/content/images";
import { COMPANY, OFFICES, whatsappUrl } from "@/content/site";

export const CONTACT_PAGE = {
  title: "Contact Us",
  description: "Rekadia helps you drive business growth through the implementation of digital transformation.",
  banner: IMAGES.pageBanner,
  map: IMAGES.officeMap,
  mapUrl: COMPANY.mapUrl,
};

export const CONTACT_FORM_COPY = {
  title: "Tell us about your business needs, and we’ll help you find the right IT solution.",
  description: "Free consultation, no obligation. Our team is ready to respond within 24 hours.",
  submit: "Send",
  submitting: "Please wait...",
  success: "Thank you! Your submission has been received!",
  failure: "Oops! Something went wrong while submitting the form.",
};

export type ContactChannelIcon = "email" | "whatsapp" | "map";

export const CONTACT_CHANNELS: {
  label: string;
  value: string;
  href?: string;
  icon: ContactChannelIcon;
}[] = [
  { label: "Email", value: "Contact@rekadia.co.id", href: `mailto:${COMPANY.email}`, icon: "email" },
  { label: "WhatsApp", value: COMPANY.whatsappDisplay, href: whatsappUrl(), icon: "whatsapp" },
  { label: OFFICES.headquarter.label, value: OFFICES.headquarter.address, icon: "map" },
  { label: OFFICES.administration.label, value: OFFICES.administration.address, icon: "map" },
];
