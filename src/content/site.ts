import type { NavItem, Office, SocialLink } from "@/types/content";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rekadia.co.id";

export const COMPANY = {
  brand: "Rekadia",
  legalName: "PT. Rekadia Solusi Teknologi",
  email: "contact@rekadia.co.id",
  whatsappNumber: "6285210261464",
  whatsappDisplay: "+62 852-1026-1464",
  whatsappGreeting: "Hello Rekadia, I am interested in Rekadia's IT solution products and services.",
  mapUrl: "https://maps.app.goo.gl/fR51DYVdJxgsgUYE7",
  foundingYear: 2010,
} as const;

export const SEO = {
  title: "Rekadia | Trusted IT Services & IT Consulting Since 2010",
  description:
    "Rekadia is trusted with 15+ years of expertise in digital solutions to improve productivity, efficiency, and business success. Let's partner with us.",
} as const;

export const ROUTES = {
  home: "/",
  solutions: "/solutions",
  industries: "/industries",
  aboutUs: "/about-us",
  contactUs: "/contact-us",
  clients: "/clients",
  blog: "/articles/blog",
  caseStudy: "/articles/case-study",
  eOffice: "/products/e-office",
  eOfficeEmail: "/products/e-office-email",
  delva: "/products/delva",
} as const;

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Solutions", href: ROUTES.solutions },
  {
    label: "Products",
    children: [
      { label: "E-Office", href: ROUTES.eOffice },
      { label: "E-Office Email", href: ROUTES.eOfficeEmail },
      { label: "Delva", href: ROUTES.delva },
    ],
  },
  { label: "Industries", href: ROUTES.industries },
  {
    label: "Articles",
    children: [
      { label: "Blog", href: ROUTES.blog },
      { label: "Case Study", href: ROUTES.caseStudy },
    ],
  },
  { label: "About", href: ROUTES.aboutUs },
  { label: "Contact", href: ROUTES.contactUs },
];

export const OFFICES: { headquarter: Office; administration: Office } = {
  headquarter: { label: "Headquarter", address: "AIA Central, Lv. 31, DKI Jakarta" },
  administration: { label: "Administration", address: "Talavera Office Park, Lv. 28, DKI Jakarta" },
};

export const FOOTER_PAGES = [
  { label: "Blog", href: ROUTES.blog },
  { label: "Case Study", href: ROUTES.caseStudy },
];

export const whatsappUrl = (message?: string, number: string = COMPANY.whatsappNumber) =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "linkedin", label: "Visit Rekadia's LinkedIn", href: "https://www.linkedin.com/company/rekadia/" },
  { platform: "youtube", label: "Visit Rekadia's YouTube", href: "https://youtube.com/@rekadia?si=8g4sv60LsqLPRYNd" },
  { platform: "email", label: "Send an email to Rekadia", href: `mailto:${COMPANY.email}` },
  { platform: "whatsapp", label: "Chat with Rekadia on WhatsApp", href: whatsappUrl() },
  { platform: "instagram", label: "Visit Rekadia's Instagram", href: "https://www.instagram.com/rekadia/" },
  {
    platform: "facebook",
    label: "Visit Rekadia's Facebook",
    href: "https://www.facebook.com/share/1CBcuEEFDj/?mibextid=wwXIfr",
  },
  {
    platform: "tiktok",
    label: "Visit Rekadia's TikTok",
    href: "https://www.tiktok.com/@rekadia_?_r=1&_t=ZS-95Pahg9OJIT",
  },
];
