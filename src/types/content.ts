export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  children: NavLink[];
}

export type NavItem = NavLink | NavDropdown;

export const isNavDropdown = (item: NavItem): item is NavDropdown => "children" in item;

export type SocialPlatform =
  | "linkedin"
  | "youtube"
  | "email"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "tiktok";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface Office {
  label: string;
  address: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  image: ImageAsset;
}

export interface AiSolution {
  title: string;
  description: string;
  background: ImageAsset;
  mobileSlide: ImageAsset;
}

export type BusinessServiceIcon = "business-applications" | "it-infrastructure" | "hardware-support";

export interface BusinessService {
  title: string;
  description: string;
  icon: BusinessServiceIcon;
}

export interface Product {
  name: string;
  href: string;
  ctaLabel: string;
  description: { en: string; id: string };
  image: ImageAsset;
  /** Render the image at 80% of its column on desktop too (as the original does for E-Office). */
  narrowImage?: boolean;
}

/** A solution card with a photo background. `title` may contain "\n" for the original's forced line breaks. */
export interface SolutionCard {
  title: string;
  description: string;
  image: ImageAsset;
}

export interface SolutionGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  link?: NavLink;
  cards: SolutionCard[];
}

export interface ProcessStep {
  title: string;
  image: ImageAsset;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  tone: "green" | "cyan" | "orange";
  price: string;
  /** Rendered after the price in small type, e.g. "/bulan/user". */
  period?: string;
  originalPrice?: string;
  features: PricingFeature[];
  /** Highlighted custom line shown last (Enterprise). */
  customFeature?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Client {
  name: string;
  logo: ImageAsset;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: ImageAsset;
}
