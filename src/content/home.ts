import { IMAGES } from "@/content/images";
import { ROUTES } from "@/content/site";
import type {
  AiSolution,
  BusinessService,
  Client,
  FeatureCard,
  Product,
  Stat,
  Testimonial,
} from "@/types/content";

export const HERO = {
  title: "Make IT Works for Your Business",
  description: "We help businesses leverage AI and technology simply, safely, and with real impact.",
  primaryCta: { label: "Free Consultation", href: ROUTES.contactUs },
  secondaryCta: { label: "See Our Solutions", href: ROUTES.solutions },
  image: IMAGES.hero,
};

export const HERO_STATS: Stat[] = [
  { value: "20+", label: "Company" },
  { value: "10+", label: "Years of Experience" },
  { value: "100+", label: "Project Completed" },
];

export const FEATURES: FeatureCard[] = [
  { title: "Friendly IT Expert", description: "Friendly IT Expert", image: IMAGES.featureExpert },
  { title: "Easy-to-Understand AI", description: "Easy-to-Understand AI", image: IMAGES.featureEasy },
  { title: "Ready-to-Use Solutions", description: "Ready-to-Use Solutions", image: IMAGES.featureSolution },
  { title: "Long Term Partner", description: "Long Term Partner", image: IMAGES.featurePartner },
];

export const AI_SECTION = {
  label: "AI Solution Highlight",
  title: "AI solutions that really work for your business",
  description:
    "Friendly, easy-to-use, ready-to-use IT and AI solutions that will be your long-term technology partner.",
  cta: { label: "Learn AI Solutions", href: ROUTES.solutions },
};

export const AI_SOLUTIONS: AiSolution[] = [
  {
    title: "AI Quality Assurance",
    description: "Ensure quality without time-consuming manual processes",
    background: IMAGES.aiBgQualityAssurance,
    mobileSlide: IMAGES.aiSlideQualityAssurance,
  },
  {
    title: "AI Audit",
    description: "Faster, more accurate audits — AI analyzes, you decide",
    background: IMAGES.aiBgAudit,
    mobileSlide: IMAGES.aiSlideAudit,
  },
  {
    title: "AI Chatbot",
    description: "Serve customers 24/7 without expanding your team",
    background: IMAGES.aiBgChatbot,
    mobileSlide: IMAGES.aiSlideChatbot,
  },
  {
    title: "AI CV Screening",
    description: "Screen hundreds of resumes in minutes, find the best candidates",
    background: IMAGES.aiBgCvScreening,
    mobileSlide: IMAGES.aiSlideCvScreening,
  },
  {
    title: "AI Voice Analytics",
    description: "Turn conversations into actionable business insights",
    background: IMAGES.aiBgVoiceAnalytics,
    mobileSlide: IMAGES.aiSlideVoiceAnalytics,
  },
];

export const BUSINESS_SECTION = {
  label: "Business Applications & IT",
  title: "Rekadia is not just AI",
  description: "We manage all your business IT needs",
};

export const BUSINESS_SERVICES: BusinessService[] = [
  {
    title: "Business Applications",
    description: "Custom app according to your operational needs",
    icon: "business-applications",
  },
  {
    title: "IT infrastructure",
    description: "Reliable and scalable servers, cloud and networks",
    icon: "it-infrastructure",
  },
  {
    title: "Hardware & Support",
    description: "Device and technical support for your team",
    icon: "hardware-support",
  },
];

const E_OFFICE_DESCRIPTION = {
  en: "E-Office is a digital document management and workflow platform designed to help companies move from manual processes (WhatsApp, email, physical) to a structured, trackable, and secure system.",
  id: "E-Office adalah platform manajemen dokumen dan alur kerja digital yang dirancang untuk membantu perusahaan beralih dari proses manual (WhatsApp, email, fisik) ke sistem yang terstruktur, terlacak, dan aman.",
};

export const PRODUCTS_LABEL = "Our Product";

export const PRODUCTS: Product[] = [
  {
    name: "Delva",
    href: ROUTES.delva,
    ctaLabel: "Explore Delva",
    // The original site reuses the E-Office copy for Delva; kept verbatim.
    description: E_OFFICE_DESCRIPTION,
    image: IMAGES.productDelva,
  },
  {
    name: "E-Office Email",
    href: ROUTES.eOfficeEmail,
    ctaLabel: "Explore E-Office Email",
    description: {
      en: "E-Office Email provides 50GB of storage per user and automatic Anti-Spam filter, keeping every business message relevant and secure.",
      id: "E-Office Email memberikan storage besar 50GB per user serta filter Anti-Spam otomatis, menjaga setiap pesan bisnis tetap relevan dan aman.",
    },
    image: IMAGES.productEOfficeEmail,
  },
  {
    name: "E-Office",
    href: ROUTES.eOffice,
    ctaLabel: "Explore E-Office",
    description: E_OFFICE_DESCRIPTION,
    image: IMAGES.productEOffice,
    narrowImage: true,
  },
];

export const CLIENTS_SECTION = {
  title: "Clients who have trusted with us",
  seeAll: { label: "See All >", href: ROUTES.clients },
};

export const CLIENTS: Client[] = [
  { name: "The Energy Building", logo: IMAGES.clientTheEnergy },
  { name: "Askrindo", logo: IMAGES.clientAskrindo },
  { name: "Bank Indonesia", logo: IMAGES.clientBankIndonesia },
  { name: "Bank BCA", logo: IMAGES.clientBca },
  { name: "Bank BTN", logo: IMAGES.clientBtn },
  { name: "Bukit Asam", logo: IMAGES.clientBukitAsam },
  { name: "CityVision", logo: IMAGES.clientCityvision },
];

export const TESTIMONIALS_SECTION = {
  label: "Our Testimonial",
  title: "We build your trust and handle your case",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Rekadia's E-Office solution does everything we need for managing our files. It comprehensively addresses all our file management needs, ensuring data security, accessibility, and ease of sharing.",
    name: "Natalia Odang",
    role: "Notary",
    avatar: IMAGES.avatarNataliaOdang,
  },
  {
    quote:
      "As a notary, my primary concerns were data security and workflow efficiency. E-Office solved both, providing me with secure backups and my team with an easy way to collaborate.",
    name: "Kartika",
    role: "Notary",
    avatar: IMAGES.avatarKartika,
  },
  {
    quote:
      "Rekadia's E-Office improves document management and team collaboration. It boosts our efficiency, especially for audits, and makes monitoring team progress easy.",
    name: "Hermen Bustaman",
    role: "KAP BEP",
    avatar: IMAGES.avatarHermenBustaman,
  },
  {
    quote:
      "E-Office is a huge time-saver! It combines chat, file sharing, and project monitoring in one place, simplifying our workflow and boosting our productivity.",
    name: "Arief Jauhari",
    role: "KAP Arief Jauhari",
    avatar: IMAGES.avatarAriefJauhari,
  },
  {
    quote:
      "Their E-Office solutions successfully integrate our daily operations. Thanks to Rekadia, our team has experienced a significant boost in productivity and efficiency.",
    name: "Dedi Sahendra",
    role: "PLN Energi Gas",
    avatar: IMAGES.avatarDediSahendra,
  },
];

export const CTA_SECTION = {
  title: "Ready to make IT work for your business?",
  description: "Consult with our team — free and without commitment",
  cta: { label: "Contact Us", href: ROUTES.contactUs },
  background: IMAGES.ctaBackground,
};

export const NEWSLETTER = {
  title: "Stay Connected with Our Newsletter",
  placeholder: "Input your email address",
  submit: "Subscribe",
  successTitle: "Thank you!",
  successMessage: "You have successfully joined our newsletter.",
};
