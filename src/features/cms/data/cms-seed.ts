import { BLOG_POSTS, CASE_STUDIES } from "@/content/articles";
import { BUSINESS_SERVICES, CLIENTS, TESTIMONIALS } from "@/content/home";
import { IMAGES } from "@/content/images";
import { INDUSTRIES } from "@/content/industries";
import { E_OFFICE_EMAIL_CLIENTS, E_OFFICE_EMAIL_TESTIMONIALS, E_OFFICE_VIDEO } from "@/content/products";
import type { CmsFieldValue, CmsItem, CmsMedia } from "@/features/cms/types/cms";
import type { ImageAsset } from "@/types/content";

/** Dummy CMS data built from the public website content, until the backend API exists. */
export interface CmsMockData {
  items: Record<string, CmsItem[]>;
  media: CmsMedia[];
}

const SEEDED_AT = "2026-11-01T02:00:00.000Z";
const SEEDED_BY = "admin";

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 256);

const lastPathSegment = (href: string) => href.replace(/\/+$/, "").split("/").pop() ?? "";

const mimeOf = (src: string) => {
  if (src.endsWith(".svg")) return "image/svg+xml";
  if (src.endsWith(".png")) return "image/png";
  if (src.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
};

const MEDIA: CmsMedia[] = Object.entries(IMAGES).map(([key, image]) => ({
  id: `media-${slugify(key.replace(/([A-Z])/g, "-$1"))}`,
  url: image.src,
  width: image.width,
  height: image.height,
  alt: image.alt,
  mimeType: mimeOf(image.src),
  size: 0,
}));

const MEDIA_BY_URL = new Map(MEDIA.map((media) => [media.url, media.id]));

const mediaId = (image: ImageAsset | undefined) => (image ? MEDIA_BY_URL.get(image.src) ?? null : null);

const pad = (value: number) => String(value).padStart(3, "0");

const makeItems = (prefix: string, rows: Record<string, CmsFieldValue>[]): CmsItem[] =>
  rows.map((row, index) => ({
    id: `${prefix}-${pad(index + 1)}`,
    status: "published",
    order: index + 1,
    createdAt: SEEDED_AT,
    updatedAt: SEEDED_AT,
    createdBy: SEEDED_BY,
    updatedBy: SEEDED_BY,
    ...row,
  }));

const NEWS_CATEGORY_NAMES = ["News", "Tech", "Education", "Event"];

const newsCategories = makeItems(
  "news-category",
  NEWS_CATEGORY_NAMES.map((name) => ({ name, slug: slugify(name) })),
);

const categoryIdByName = new Map(newsCategories.map((category) => [category.name as string, category.id]));

const news = makeItems(
  "news",
  BLOG_POSTS.map((post) => ({
    title: post.title,
    slug: lastPathSegment(post.href) || slugify(post.title),
    summary: post.summary,
    body: `<p>${post.summary}</p>`,
    categoryId: categoryIdByName.get(post.category) ?? newsCategories[0].id,
    publishedAt: post.date,
    coverImageId: mediaId(IMAGES.blogCover),
    seoTitle: "",
    seoDescription: "",
  })),
);

const caseStudies = makeItems(
  "case-study",
  CASE_STUDIES.map((study) => ({
    title: study.title,
    slug: lastPathSegment(study.href) || slugify(study.title),
    category: study.category,
    clientName: study.logo.alt,
    summary: study.summary,
    body: `<p>${study.summary}</p>`,
    logoId: mediaId(study.logo),
    coverImageId: mediaId(study.image),
  })),
);

const portfolios = makeItems("portfolio", [
  { title: "Delva Inspection Platform", slug: "delva-inspection-platform", summary: "Digital inspection and maintenance workflow for industrial assets.", link: "/products/delva", imageId: mediaId(IMAGES.productDelva) },
  { title: "E-Office Document Workspace", slug: "e-office-document-workspace", summary: "Paperless document management and approval workflow.", link: "/products/e-office", imageId: mediaId(IMAGES.productEOffice) },
  { title: "E-Office Email Migration", slug: "e-office-email-migration", summary: "Business email with 50GB storage per user and anti-spam filtering.", link: "/products/e-office-email", imageId: mediaId(IMAGES.productEOfficeEmail) },
  { title: "AI Assistant Dashboard", slug: "ai-assistant-dashboard", summary: "AI-powered dashboards that turn operational data into decisions.", link: "/solutions", imageId: mediaId(IMAGES.hero) },
]);

const industries = makeItems(
  "industry",
  INDUSTRIES.map((industry) => ({
    title: industry.title,
    slug: slugify(industry.title),
    description: industry.description,
    imageId: mediaId(industry.image),
  })),
);

const services = makeItems("service", [
  ...BUSINESS_SERVICES.map((service) => ({
    title: service.title,
    slug: slugify(service.title),
    description: service.description,
    link: "/solutions",
    iconId: null,
  })),
  { title: "Web & Mobile Apps", slug: "web-mobile-apps", description: "Web and mobile applications built around your processes.", link: "/solutions", iconId: mediaId(IMAGES.businessWebMobileApp) },
  { title: "Business Intelligence", slug: "business-intelligence", description: "Dashboards and reports for faster decision-making.", link: "/solutions", iconId: mediaId(IMAGES.businessIntelligence) },
  { title: "Workflow Automation", slug: "workflow-automation", description: "Automate approvals and repetitive manual work.", link: "/solutions", iconId: mediaId(IMAGES.businessWorkflowAutomation) },
]);

const job = (title: string, employmentType: string, department: string, location: string, isOpen = true) => ({
  title,
  slug: slugify(title),
  department,
  location,
  employmentType,
  description: `<p>Join Rekadia as a ${title} and help our clients make IT work.</p>`,
  requirements: "<ul><li>Relevant experience in a similar role</li><li>Good communication skills</li></ul>",
  applyUrl: "",
  applyEmail: "career@rekadia.co.id",
  closingDate: "2026-12-31",
  isOpen,
});

const careers = makeItems("career", [
  job("Frontend Developer", "full-time", "Engineering", "Jakarta"),
  job("Backend Developer (.NET)", "full-time", "Engineering", "Jakarta"),
  job("UI/UX Designer", "full-time", "Product", "Jakarta"),
  job("Quality Assurance Engineer", "contract", "Engineering", "Remote"),
  job("IT Support", "full-time", "Infrastructure", "Jakarta"),
  job("Digital Marketing", "contract", "Marketing", "Jakarta"),
  job("Software Engineer Intern", "internship", "Engineering", "Jakarta", false),
]);

const clients = makeItems("client", [
  ...CLIENTS.map((client) => ({ name: client.name, website: "", logoId: mediaId(client.logo), showOn: ["home", "e-office"] })),
  ...E_OFFICE_EMAIL_CLIENTS.map((client) => ({ name: client.name, website: "", logoId: mediaId(client.logo), showOn: ["it-friendly"] })),
]);

const textTestimonial = (category: string, item: { quote: string; name: string; role: string; avatar: ImageAsset }) => ({
  category,
  format: "text",
  name: item.name,
  role: item.role,
  company: "",
  quote: item.quote,
  avatarId: mediaId(item.avatar),
  videoUrl: "",
  thumbnailId: null,
});

const DELVA_TESTIMONIALS = [
  { name: "Budi Santoso", role: "Head of Operations", quote: "Delva makes our inspection schedule easy to follow and every finding easy to track." },
  { name: "Rina Wulandari", role: "Maintenance Planner", quote: "Our checksheets moved from paper to Delva in a few weeks." },
  { name: "Agus Hidayat", role: "Plant Manager", quote: "The dashboard gives us a clear picture of asset condition every morning." },
  { name: "Siti Rahma", role: "HSE Supervisor", quote: "Findings are now followed up faster because everyone sees the same data." },
  { name: "Yoga Prasetyo", role: "Reliability Engineer", quote: "Maintenance plans are finally connected to the actual inspection results." },
];

const testimonials = makeItems("testimonial", [
  ...TESTIMONIALS.map((item) => ({
    ...textTestimonial("home", item),
    format: "video",
    quote: "",
    videoUrl: `https://www.youtube.com/embed/${E_OFFICE_VIDEO.youtubeId}`,
    thumbnailId: mediaId(IMAGES.blogCover),
  })),
  ...TESTIMONIALS.map((item) => textTestimonial("e-office", item)),
  ...E_OFFICE_EMAIL_TESTIMONIALS.items.map((item) => textTestimonial("e-office-email", item)),
  ...DELVA_TESTIMONIALS.map((item) => ({
    category: "delva",
    format: "text",
    name: item.name,
    role: item.role,
    company: "",
    quote: item.quote,
    avatarId: null,
    videoUrl: "",
    thumbnailId: null,
  })),
]);

export const createCmsSeed = (): CmsMockData => ({
  items: {
    news,
    "news-categories": newsCategories,
    "case-studies": caseStudies,
    portfolios,
    industries,
    services,
    careers,
    clients,
    testimonials,
  },
  media: MEDIA,
});
