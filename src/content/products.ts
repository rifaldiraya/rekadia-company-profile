import { CASE_STUDIES, type CaseStudyCard } from "@/content/articles";
import { CLIENTS, TESTIMONIALS } from "@/content/home";
import { IMAGES } from "@/content/images";
import { ROUTES, whatsappUrl } from "@/content/site";
import type {
  Client,
  FaqItem,
  ImageAsset,
  NavLink,
  PricingPlan,
  ProductFeature,
  Stat,
  Testimonial,
} from "@/types/content";

/** The original E-Office pages route some WhatsApp buttons to this second number; kept as published. */
const E_OFFICE_SALES_WHATSAPP = "6285119794446";
const E_OFFICE_WHATSAPP_MESSAGE = "Hello! I want to ask about E-Office";

const SCHEDULE_DEMO: NavLink = { label: "Schedule a Demo", href: ROUTES.contactUs };

export interface ProductPricing {
  label: string;
  title: string;
  whatsappHref: string;
  plans: PricingPlan[];
}

export interface ProductFaq {
  label: string;
  title: string;
  items: FaqItem[];
}

export interface ProductContact {
  label: string;
  title: string;
  description: string;
  /** Overrides the shared contact form heading (the E-Office Email page uses its own). */
  formTitle?: string;
  formDescription?: string;
}

/* ------------------------------------------------------------------ E-Office */

export const E_OFFICE_PAGE = {
  metaTitle: "E-Office: Total Security Solutions for Your Company File Storage",
  metaDescription:
    "A company's files are the most valuable asset. The company will suffer losses if the files are lost due to laptop damage or stolen. With E-Office, you can protect all your company's files with 3 excellent features.",
};

export const E_OFFICE_HERO = {
  logo: IMAGES.logoEOffice,
  title: "Manage Your Company's Documents and Workflows Digitally",
  description:
    "E-Office is a digital document and workflow management platform designed to help companies transition from manual processes (WhatsApp, email, paper-based) to a structured, traceable, and secure system.",
  image: IMAGES.productEOffice,
  /** Shown from 992px up. */
  desktopCtas: {
    whatsapp: {
      label: "Our WhatsApp",
      href: whatsappUrl(E_OFFICE_WHATSAPP_MESSAGE, E_OFFICE_SALES_WHATSAPP),
    },
    demo: SCHEDULE_DEMO,
  },
  /** Shown below 992px; the original labels these in capitals. */
  mobileCtas: {
    whatsapp: { label: "WHATSAPP US", href: whatsappUrl(E_OFFICE_WHATSAPP_MESSAGE) },
    demo: { label: "SCHEDULE A DEMO", href: ROUTES.contactUs },
  },
};

export const E_OFFICE_VIDEO = {
  youtubeId: "S6Xh8faMiCY",
  title: "E-Office: Solusi Keamanan Total untuk Penyimpanan File Perusahaan Anda",
};

export type EOfficeFeatureIcon = "document" | "approval" | "security" | "notification" | "integration";

export const E_OFFICE_FEATURES: {
  label: string;
  title: string;
  items: (ProductFeature & { icon: EOfficeFeatureIcon })[];
} = {
  label: "Key Features of E-Office",
  title: "E-Office Features for the Security of Your Company Files",
  items: [
    {
      icon: "document",
      title: "Document Management",
      description: "Save, search for, and access documents anytime,  no more lost files or confusing versions.",
    },
    {
      icon: "approval",
      title: "Approval Workflow",
      description: "A fast, traceable, and contactless digital approval process.",
    },
    {
      icon: "security",
      title: "Data Security",
      description:
        "Access control and protection for confidential company files — only authorized personnel can access them.",
    },
    {
      icon: "notification",
      title: "Real-time Notifications",
      description: "No documents are missed or late everyone receives automatic notifications.",
    },
    {
      icon: "integration",
      title: "System Integration",
      description: "Integrates with the HR/ERP system you’re already using.",
    },
  ],
};

export interface BenefitCard {
  title: string;
  description: string;
  image: ImageAsset;
  /** The original styles two titles differently ("Visibilitas" smaller, "Paperless" bolder); kept as published. */
  titleStyle?: "small" | "bold";
}

export const E_OFFICE_BENEFITS: { label: string; title: string; cards: BenefitCard[] } = {
  label: "Manfaat Untuk Bisnis",
  title: "Why Choose E-Office?",
  cards: [
    {
      title: "Time Efficiency",
      description: "Cut approval time from days to hours, no need to wait for physical signatures.",
      image: IMAGES.benefitTimeEfficiency,
    },
    {
      title: "Security",
      description: "Confidential company files are protected from unauthorized access, including by former employees.",
      image: IMAGES.benefitSecurity,
    },
    {
      title: "Visibilitas",
      description: "Management can view document status and approval status in real time, at any time.",
      image: IMAGES.benefitVisibility,
      titleStyle: "small",
    },
    {
      title: "Paperless",
      description: "Significantly reduce paper usage and printing costs.",
      image: IMAGES.benefitPaperless,
      titleStyle: "bold",
    },
  ],
};

export const E_OFFICE_CLIENTS: Client[] = CLIENTS;

export const E_OFFICE_TESTIMONIALS = {
  label: "Testimonial",
  title: "What Do They Say?",
  items: TESTIMONIALS,
};

export const E_OFFICE_PRICING: ProductPricing = {
  label: "E-Office Package",
  title: "Upgrade anytime to meet\nyour team’s needs",
  whatsappHref: whatsappUrl(E_OFFICE_WHATSAPP_MESSAGE, E_OFFICE_SALES_WHATSAPP),
  plans: [
    {
      name: "Standard",
      tone: "green",
      price: "Rp69.000",
      period: "/bulan/user",
      originalPrice: "Rp99.000",
      features: [
        { label: "Company Folder 1 TB+", included: true },
        { label: "Email 50 GB/user", included: true },
        { label: "Access Permissions Settings", included: true },
        { label: "Unlimited backup data", included: false },
        { label: "File Protection", included: false },
      ],
    },
    {
      name: "Premium",
      tone: "cyan",
      price: "Rp129.000",
      period: "/bulan/user",
      originalPrice: "Rp199.000",
      features: [
        { label: "1TB+ Company Folder", included: true },
        { label: "Email 50 GB/user", included: true },
        { label: "Access Permissions Settings", included: true },
        { label: "Unlimited backup data", included: true },
        { label: "Proteksi File", included: false },
      ],
    },
    {
      name: "Enterprise",
      tone: "orange",
      price: "NEED ASSESMENT",
      features: [
        { label: "Folder Perusahaan 1TB+", included: true },
        { label: "Email 50 GB/user", included: true },
        { label: "Access Permissions Settings", included: true },
        { label: "Unlimited backup data", included: true },
        { label: "Proteksi File", included: true },
      ],
      customFeature: "Need Assesment (Custom)",
    },
  ],
};

export const E_OFFICE_FAQ: ProductFaq = {
  label: "FAQ",
  title: "E-Office FAQ",
  items: [
    {
      question: "What happens if my team encounters problems or difficulties while using E-Office?",
      answer:
        "Jangan khawatir, kami menyediakan layanan helpdesk. Kami siap membantu perusahaan Anda jika Anda membutuhkan panduan atau mengalami masalah teknis.",
    },
    {
      question: "What if my company has never used a system like this before?",
      answer:
        "Kami menyediakan pelatihan untuk perusahaan Anda agar semua karyawan Anda dapat dan mahir dalam menggunakan semua fitur E-Office dengan benar dan efisien.",
    },
    {
      question: "Besides technical support and training, are there any other benefits I can get as a customer?",
      answer:
        "Tentu saja. Anda akan menerima undangan untuk acara khusus pelanggan kami. Ini adalah kesempatan istimewa untuk berpartisipasi dalam sesi berbagi pengetahuan dan mendapatkan pembaruan teknologi terbaru yang diadakan secara eksklusif untuk pelanggan setiap 3 bulan sekali.",
    },
    {
      question: "What’s the Difference Between E-Office and Google Drive?",
      answer:
        "E-Office memiliki sistem keamanan dan kontrol akses yang lebih ketat daripada Google Drive, disimpan di pusat folder perusahaan Anda, bukan di folder per pengguna.",
    },
    {
      question: "Are company files on E-Office secure?",
      answer:
        "E-Office is very secure for corporate file storage. Files are stored with encryption, file access is strictly regulated only for those who are licensed, and is certified by ISO 27001, 27017, 27018. The security and confidentiality of your company's data is our top priority.",
    },
  ],
};

export const E_OFFICE_CONTACT: ProductContact = {
  label: "Contact Us",
  title: "Ready to Switch to\nE-Office?",
  description:
    "Discuss your company’s email needs with our team. We’ll fully assist with the migration process, ensuring no operational disruptions.",
};

/* ------------------------------------------------------------ E-Office Email */

export const E_OFFICE_EMAIL_PAGE = {
  metaTitle: "E-Office Email | 50GB Business Email with Anti-Spam",
  metaDescription:
    "Professional business email with 50GB storage, 99.9% anti-spam protection, and multi-device access. Fully assisted migration. Starting at Rp99.000/month.",
};

export const E_OFFICE_EMAIL_HERO: {
  label: string;
  title: string;
  description: string;
  image: ImageAsset;
  ctas: { whatsapp: NavLink; demo: NavLink };
  stats: (Stat & { unit: string })[];
} = {
  label: "Professional Email for Businesses",
  title: "Business Email Solutions with More Storage",
  description:
    "Corporate email is the hub of business communication. Professional business communication starts with a secure inbox. E-Office Email offers 50GB of storage per user and automatic anti-spam filters, ensuring that every business message remains relevant and secure.",
  image: IMAGES.eOfficeEmailHero,
  ctas: {
    whatsapp: { label: "Our WhatsApp", href: whatsappUrl(undefined, E_OFFICE_SALES_WHATSAPP) },
    demo: SCHEDULE_DEMO,
  },
  stats: [
    { value: "50", unit: "GB", label: "Per User" },
    { value: "50", unit: "%", label: "More Economical" },
    { value: "100", unit: "%", label: "All Set" },
  ],
};

export const E_OFFICE_EMAIL_FEATURES: {
  label: string;
  title: string;
  description: string;
  items: (ProductFeature & { emoji: string; badge: string })[];
} = {
  label: "E-Office Email Features",
  title: "Everything the Team Needs",
  description:
    "Professional email isn’t just about sending messages—it’s about productivity, security, and collaboration across the entire organization.",
  items: [
    {
      emoji: "💾",
      title: "Storage 50 GB/User",
      description:
        "Ample email storage space for every user. No need to worry about emails being deleted because the inbox is full.",
      badge: "Twice as Big",
    },
    {
      emoji: "🌐",
      title: "Company Domain",
      description:
        "Use your existing @company.com domain. There’s no need to change your email address or email domain.",
      badge: "Without Rebranding",
    },
    {
      emoji: "🛡️",
      title: "Anti-Spam & Anti-Virus",
      description: "Advanced filters block spam, phishing, and malware before they reach employees' inboxes.",
      badge: "99.9% accurate",
    },
    {
      emoji: "👥",
      title: "User Controls",
      description:
        "Changes to employee accounts are processed quickly by our team, so you don’t have to handle them yourself.",
      badge: "Manage via Request",
    },
    {
      emoji: "📱",
      title: "Multi-Device Access",
      description: "Access your email from a browser or the iOS and Android mobile apps anytime, anywhere.",
      badge: "Real-time synchronization",
    },
    {
      emoji: "🎯",
      title: "Training and Support",
      description:
        "The E-Office team is ready to assist with the migration process and email user training from start to finish, until employees are fully operational.",
      badge: "Fully Assisted Migration",
    },
  ],
};

export const E_OFFICE_EMAIL_PRICING: ProductPricing = {
  label: "E-Office Email Package",
  title: "Upgrade anytime to meet your team’s needs",
  whatsappHref: whatsappUrl(E_OFFICE_WHATSAPP_MESSAGE),
  plans: [
    {
      name: "Standard",
      tone: "green",
      price: "Rp69.000",
      period: "/month/user",
      originalPrice: "Rp99.000",
      features: [
        { label: "Email 50 GB/user", included: true },
        { label: "Enterprise Cloud 1 TB+", included: true },
        { label: "Free helpdesk & ticketing", included: true },
        { label: "Backup", included: false },
      ],
    },
    {
      name: "Premium",
      tone: "cyan",
      price: "Rp129.000",
      period: "/month/user",
      originalPrice: "Rp199.000",
      features: [
        { label: "Email 50 GB/user", included: true },
        { label: "Enterprise Cloud 1 TB+", included: true },
        { label: "Free helpdesk & ticketing", included: true },
        { label: "Backup", included: true },
        { label: "Auto Lock File", included: false },
      ],
    },
    {
      name: "Enterprise",
      tone: "orange",
      price: "NEED ASSESMENT",
      features: [
        { label: "Email 50 GB/user", included: true },
        { label: "Enterprise Cloud 1 TB+", included: true },
        { label: "Free helpdesk & ticketing", included: true },
        { label: "Backup", included: true },
        { label: "Auto Lock File", included: true },
      ],
      customFeature: "Need Assesment (Custom)",
    },
  ],
};

export const E_OFFICE_EMAIL_CLIENTS: Client[] = [
  { name: "Dana Pensiun Biro Klasifikasi Indonesia", logo: IMAGES.clientDapenBki },
  { name: "PT Sorik Marapi Geothermal Power", logo: IMAGES.clientSorikMarapi },
  { name: "PT Step Point Indonesia", logo: IMAGES.clientStepPoint },
];

export const E_OFFICE_EMAIL_TESTIMONIALS: { label: string; title: string; items: Testimonial[] } = {
  label: "Testimonial",
  title: "We build your trust and handle your case",
  items: [
    {
      quote: "Solusi E-Office Rekadia membuat sistem email kami lebih stabil dan cepat.",
      name: "Andi Pratama",
      role: "PT Sinar Jernih Suksesindo",
      avatar: IMAGES.avatarAndiPratama,
    },
    {
      quote: "E-Office Rekadia membantu mengatasi kendala email sebelumnya.",
      name: "Novita Sari",
      role: "PT Nolimit Teknologi Indonesia",
      avatar: IMAGES.avatarNovitaSari,
    },
    {
      quote: "Sejak menggunakan E-Office Rekadia, sistem email kami lebih andal.",
      name: "Roni",
      role: "PT Cipta Teknik Utama",
      avatar: IMAGES.avatarRoni,
    },
  ],
};

export const E_OFFICE_EMAIL_FAQ: ProductFaq = {
  label: "FAQ",
  title: "E-Office Email FAQ",
  items: [
    {
      question: "Can I migrate from my old email account?",
      answer: "Yes, our team will assist with the migration process without disrupting operations",
    },
    {
      question: "What sets E-Office email apart from others?",
      answer: "E-Office email comes with spam protection, delivery guarantees, and increased storage capacity",
    },
    { question: "Where is the E-Office email server located?", answer: "Located in Indonesia" },
    {
      question: "What’s the Difference Between E-Office and Google Drive?",
      answer:
        "E-Office has stricter security and access controls than Google Drive; files are stored in your company’s central folder, not in individual user folders.",
    },
    {
      question: "If I cancel my subscription, how secure is my data?",
      answer: "Your data is secure because it will be automatically deleted 30 days after you cancel your subscription",
    },
  ],
};

export const E_OFFICE_EMAIL_CONTACT: ProductContact = {
  label: "Contact Us",
  title: "Ready to Switch to E-Office Email?",
  description:
    "Discuss your company’s email needs with our team. We’ll fully assist with the migration process, ensuring no operational disruptions.",
  formTitle: "Ready to Switch to E-Office Email?",
  formDescription: "Please fill out the form below, and our team will contact you shortly.",
};

/* --------------------------------------------------------------------- Delva */

export const DELVA_PAGE = {
  metaTitle: "Delva - Maintenance Management App | Rekadia Solusi",
  metaDescription:
    "Delva is a web and mobile maintenance management app for accurate, real-time reporting. Features work orders, checksheets, dashboards & ERP integration.",
};

export const DELVA_HERO = {
  logo: IMAGES.logoDelva,
  title: "YOUR MAINTENANCE SOLUTION FOR",
  titleAccent: "LONGER ASSET LIFETIME.",
  description:
    "Delva helps you manage maintenance in a planned way within one system to reduce downtime, lower maintenance costs, keep equipment in good condition, and keep maintenance work under control.",
  image: IMAGES.delvaHero,
  background: IMAGES.delvaHeroBackground,
  ctas: {
    demo: { label: "Schedule a Demo →", href: "#contact" },
    team: { label: "Talk to Our Team", href: ROUTES.contactUs },
  },
};

export const DELVA_VIDEO = {
  title: "SIMPLIFY YOUR MAINTENANCE.",
  youtubeId: "kGchWVMnaa4",
  videoTitle: "Maintenance Tanpa Ribet dengan Delva",
};

export interface DelvaFeature {
  label: string;
  title: string;
  description: string;
  image: ImageAsset;
}

export const DELVA_FEATURES: { title: string; items: DelvaFeature[] } = {
  title: "Delva Features",
  items: [
    {
      label: "01 Dashboard",
      title: "VISIBILITY INTO MAINTENANCE WORKS",
      description:
        "Monitor maintenance status, equipment condition, and breakdowns in one dashboard. Gain visibility into budget usage, spare part needs, and breakdown time to help your team set maintenance priorities.",
      image: IMAGES.delvaFeatureDashboard,
    },
    {
      label: "02 Maintenance Plan",
      title: "AUTOMATIC MAINTENANCE WORK ORDER",
      description:
        "Relying on memory for maintenance puts scheduled care at risk of being missed. Delva schedules maintenance automatically based on time or equipment usage in the production area, so routine work is never missed. Use Trend Report to see maintenance patterns and help your team determine maintenance needs before equipment runs into problems.",
      image: IMAGES.delvaFeatureMaintenancePlan,
    },
    {
      label: "03 Checksheet",
      title: "MAKE EVERY CHECK EASIER & ACURRATE",
      description:
        "Technicians can record maintenance work reports directly from their phones, paper-free, making their work more efficient. Forms can be designed to fit your company's needs. Reports are saved to the system automatically. Supervisors know which work is still pending.",
      image: IMAGES.delvaFeatureChecksheet,
    },
    {
      label: "04 Finding & Corrective Maintenance",
      title: "TURN ISSUES INTO ACTION",
      description:
        "Every finding can be turned straight into a work order. Create and assign work to technicians based on the finding, complete with priority and the required job details. Track repair progress until the work is done to minimize production loss.",
      image: IMAGES.delvaFeatureFinding,
    },
  ],
};

export interface DelvaStep {
  number: string;
  name: string;
  title: string;
  description: string;
}

export const DELVA_WORKFLOW: { title: string; description: string; steps: DelvaStep[] } = {
  title: "HOW DELVA WORKS",
  description:
    "Manage your maintenance process in a structured way, from identification, planning, and execution to monitoring and analysis.",
  steps: [
    {
      number: "01",
      name: "Detect",
      title: "01 DETECT",
      description:
        "Identify maintenance needs from field findings or equipment inspection results through the mobile app.",
    },
    {
      number: "02",
      name: "Maintenance Plan/Reminder",
      title: "02 MAINTENANCE PLAN/REMINDER",
      description:
        "Follow routine maintenance schedules with reminders that help the team know when maintenance needs to be done and followed up.",
    },
    {
      number: "03",
      name: "Assign",
      title: "03 ASSIGN",
      description:
        "Create and assign work orders to technicians based on job needs, complete with priority and the required checksheets.",
    },
    {
      number: "04",
      name: "Start Work",
      title: "04 START WORK",
      description:
        "Technicians carry out the work in the field, attach photos, and update status and work results directly from their mobile devices.",
    },
    {
      number: "05",
      name: "Monitor Progress",
      title: "05 MONITOR PROGRESS",
      description:
        "Track work progress on the dashboard so supervisors can follow job status and maintenance follow-ups.",
    },
    {
      number: "06",
      name: "Analyze",
      title: "06 ANALYZE",
      description:
        "Use maintenance work data to understand work patterns, equipment condition, breakdowns, and upcoming maintenance needs.",
    },
  ],
};

export const DELVA_CASE_STUDIES: {
  label: string;
  title: string;
  description: string;
  background: ImageAsset;
  items: CaseStudyCard[];
} = {
  label: "CASE STUDY / EDUCATION",
  title: "IMPROVE MAINTENANCE EFFECTIVENESS.",
  description: "See how companies are simplifying their maintenance processes with Delva.",
  background: IMAGES.delvaCaseStudyBackground,
  items: CASE_STUDIES,
};

export const DELVA_CONTACT: ProductContact = {
  label: "Contact Us",
  title: "Ready to Switch to Delva?",
  description:
    "Discuss your company’s needs with our team. We provide full support for the migration process, ensuring no operational disruptions.",
};
