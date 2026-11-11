import type { CmsField, CmsFieldOption, CmsResource } from "@/features/cms/types/cms";

export const TESTIMONIAL_CATEGORIES: CmsFieldOption[] = [
  { value: "home", label: "Home" },
  { value: "e-office", label: "E-Office" },
  { value: "e-office-email", label: "E-Office Email" },
  { value: "delva", label: "Delva" },
];

export const TESTIMONIAL_FORMATS: CmsFieldOption[] = [
  { value: "text", label: "Text" },
  { value: "video", label: "Video" },
];

export const CLIENT_PLACEMENTS: CmsFieldOption[] = [
  { value: "home", label: "Home" },
  { value: "e-office", label: "E-Office" },
  { value: "it-friendly", label: "IT Friendly" },
];

export const EMPLOYMENT_TYPES: CmsFieldOption[] = [
  { value: "full-time", label: "Full-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const slugField = (from: string): CmsField => ({
  name: "slug",
  label: "Slug",
  type: "slug",
  required: true,
  maxLength: 256,
  slugFrom: from,
  helperText: "Used in the page URL. Generated from the title until you edit it.",
});

const seoFields: CmsField[] = [
  { name: "seoTitle", label: "SEO title", type: "text", maxLength: 70, placement: "side" },
  { name: "seoDescription", label: "SEO description", type: "textarea", maxLength: 160, placement: "side" },
];

export const CMS_RESOURCES: CmsResource[] = [
  {
    slug: "news",
    name: "News",
    singular: "News article",
    group: "Content",
    description: "Articles shown on the Blog page.",
    titleField: "title",
    defaultSort: "-publishedAt",
    replaces: ["News"],
    filters: ["categoryId"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 256 },
      slugField("title"),
      { name: "summary", label: "Summary", type: "textarea", required: true, maxLength: 500, helperText: "Shown on the blog card." },
      { name: "body", label: "Body", type: "html", required: true },
      { name: "categoryId", label: "Category", type: "reference", reference: "news-categories", required: true, placement: "side" },
      { name: "publishedAt", label: "Publish date", type: "date", required: true, placement: "side" },
      { name: "coverImageId", label: "Cover image", type: "media", placement: "side" },
      ...seoFields,
    ],
    columns: [
      { field: "coverImageId", label: "", kind: "media" },
      { field: "title", label: "Title" },
      { field: "categoryId", label: "Category", kind: "reference" },
      { field: "publishedAt", label: "Published", kind: "date" },
    ],
  },
  {
    slug: "news-categories",
    name: "News Categories",
    singular: "Category",
    group: "Content",
    description: "Categories used to group news articles.",
    titleField: "name",
    defaultSort: "order",
    replaces: ["Categories News"],
    filters: [],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, maxLength: 100 },
      { ...slugField("name"), maxLength: 100 },
    ],
    columns: [
      { field: "name", label: "Name" },
      { field: "slug", label: "Slug" },
    ],
  },
  {
    slug: "case-studies",
    name: "Case Studies",
    singular: "Case study",
    group: "Content",
    description: "Client success stories on the Case Study page and Delva page.",
    titleField: "title",
    defaultSort: "order",
    replaces: ["Case Studies"],
    filters: [],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 256 },
      slugField("title"),
      { name: "summary", label: "Summary", type: "textarea", required: true, maxLength: 500 },
      { name: "body", label: "Body", type: "html" },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        placement: "side",
        options: [
          { value: "finance", label: "Finance" },
          { value: "corporate", label: "Corporate" },
          { value: "energy", label: "Energy" },
          { value: "education", label: "Education" },
          { value: "healthcare", label: "Healthcare" },
        ],
      },
      { name: "clientName", label: "Client name", type: "text", maxLength: 256, placement: "side" },
      { name: "logoId", label: "Client logo", type: "media", required: true, placement: "side" },
      { name: "coverImageId", label: "Cover image", type: "media", required: true, placement: "side" },
    ],
    columns: [
      { field: "coverImageId", label: "", kind: "media" },
      { field: "title", label: "Title" },
      { field: "category", label: "Category", kind: "chip" },
      { field: "clientName", label: "Client" },
    ],
  },
  {
    slug: "portfolios",
    name: "Portfolios",
    singular: "Portfolio",
    group: "Content",
    description: "Project highlights. May be merged into Case Studies (to be confirmed).",
    titleField: "title",
    defaultSort: "order",
    replaces: ["Portofolios"],
    pendingConfirmation: true,
    filters: [],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 256 },
      slugField("title"),
      { name: "summary", label: "Summary", type: "textarea", maxLength: 500 },
      { name: "link", label: "Link", type: "url" },
      { name: "imageId", label: "Image", type: "media", required: true, placement: "side" },
    ],
    columns: [
      { field: "imageId", label: "", kind: "media" },
      { field: "title", label: "Title" },
      { field: "link", label: "Link" },
    ],
  },
  {
    slug: "industries",
    name: "Industries",
    singular: "Industry",
    group: "Content",
    description: "Industries shown on the Industries page.",
    titleField: "title",
    defaultSort: "order",
    replaces: ["Industries"],
    filters: [],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 256 },
      slugField("title"),
      { name: "description", label: "Description", type: "textarea", required: true, maxLength: 1000 },
      { name: "imageId", label: "Image", type: "media", required: true, placement: "side" },
    ],
    columns: [
      { field: "imageId", label: "", kind: "media" },
      { field: "title", label: "Title" },
      { field: "description", label: "Description" },
    ],
  },
  {
    slug: "services",
    name: "Services",
    singular: "Service",
    group: "Content",
    description: "Services shown on the Home and Solutions pages.",
    titleField: "title",
    defaultSort: "order",
    replaces: ["Services"],
    filters: [],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 256 },
      slugField("title"),
      { name: "description", label: "Description", type: "textarea", required: true, maxLength: 1000 },
      { name: "link", label: "Link", type: "text", helperText: "Internal page, e.g. /solutions" },
      { name: "iconId", label: "Icon", type: "media", placement: "side" },
    ],
    columns: [
      { field: "iconId", label: "", kind: "media" },
      { field: "title", label: "Title" },
      { field: "link", label: "Link" },
    ],
  },
  {
    slug: "careers",
    name: "Careers",
    singular: "Job opening",
    group: "Content",
    description: "Open positions at Rekadia.",
    titleField: "title",
    defaultSort: "order",
    replaces: ["Careers"],
    filters: ["employmentType", "isOpen"],
    requireOneOf: [["applyUrl", "applyEmail"]],
    fields: [
      { name: "title", label: "Job title", type: "text", required: true, maxLength: 256 },
      slugField("title"),
      { name: "description", label: "Description", type: "html", required: true },
      { name: "requirements", label: "Requirements", type: "html" },
      { name: "applyUrl", label: "Apply URL", type: "url", helperText: "Fill in the apply URL or the apply email." },
      { name: "applyEmail", label: "Apply email", type: "email" },
      { name: "isOpen", label: "Open for applications", type: "boolean", defaultValue: true, placement: "side" },
      { name: "employmentType", label: "Employment type", type: "select", required: true, options: EMPLOYMENT_TYPES, placement: "side" },
      { name: "department", label: "Department", type: "text", maxLength: 100, placement: "side" },
      { name: "location", label: "Location", type: "text", required: true, maxLength: 100, placement: "side" },
      { name: "closingDate", label: "Closing date", type: "date", placement: "side" },
    ],
    columns: [
      { field: "title", label: "Job title" },
      { field: "employmentType", label: "Type", kind: "chip" },
      { field: "location", label: "Location" },
      { field: "isOpen", label: "Open", kind: "boolean" },
    ],
  },
  {
    slug: "clients",
    name: "Clients",
    singular: "Client",
    group: "Clients",
    description: "Client logos. One logo can appear on several pages.",
    titleField: "name",
    defaultSort: "order",
    replaces: ["Clients", "E-Office Clients", "IT Friendlies"],
    filters: ["showOn"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, maxLength: 256 },
      { name: "website", label: "Website", type: "url" },
      {
        name: "showOn",
        label: "Show on",
        type: "multiselect",
        required: true,
        options: CLIENT_PLACEMENTS,
        defaultValue: ["home"],
        helperText: "Pick every page where this logo should appear.",
      },
      { name: "logoId", label: "Logo", type: "media", required: true, placement: "side" },
    ],
    columns: [
      { field: "logoId", label: "", kind: "media" },
      { field: "name", label: "Name" },
      { field: "showOn", label: "Show on", kind: "chips" },
    ],
  },
  {
    slug: "testimonials",
    name: "Testimonials",
    singular: "Testimonial",
    group: "Testimonials",
    description: "Text and video testimonials for the Home and product pages.",
    titleField: "name",
    defaultSort: "order",
    replaces: ["Testimoni Videos", "E-Office-Testimonis", "E-Office-Email-Testimonis", "Delva-Testimonis"],
    filters: ["category", "format"],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, maxLength: 256 },
      { name: "role", label: "Role", type: "text", required: true, maxLength: 256 },
      { name: "company", label: "Company", type: "text", maxLength: 256 },
      {
        name: "quote",
        label: "Quote",
        type: "textarea",
        maxLength: 2000,
        requiredWhen: { field: "format", equals: "text" },
        visibleWhen: { field: "format", equals: "text" },
      },
      {
        name: "videoUrl",
        label: "Video URL",
        type: "url",
        helperText: "YouTube or Vimeo embed URL.",
        requiredWhen: { field: "format", equals: "video" },
        visibleWhen: { field: "format", equals: "video" },
      },
      { name: "category", label: "Page", type: "select", required: true, options: TESTIMONIAL_CATEGORIES, defaultValue: "home", placement: "side" },
      { name: "format", label: "Format", type: "select", required: true, options: TESTIMONIAL_FORMATS, defaultValue: "text", placement: "side" },
      { name: "avatarId", label: "Avatar", type: "media", placement: "side" },
      {
        name: "thumbnailId",
        label: "Video thumbnail",
        type: "media",
        placement: "side",
        visibleWhen: { field: "format", equals: "video" },
      },
    ],
    columns: [
      { field: "avatarId", label: "", kind: "media" },
      { field: "name", label: "Name" },
      { field: "category", label: "Page", kind: "chip" },
      { field: "format", label: "Format", kind: "chip" },
    ],
  },
];

export const CMS_RESOURCE_MAP: Record<string, CmsResource> = Object.fromEntries(
  CMS_RESOURCES.map((resource) => [resource.slug, resource]),
);

export const getCmsResource = (slug: string): CmsResource | undefined => CMS_RESOURCE_MAP[slug];

export const getCmsField = (resource: CmsResource, name: string) => resource.fields.find((field) => field.name === name);

export const optionLabel = (field: CmsField | undefined, value: string) =>
  field?.options?.find((option) => option.value === value)?.label ?? value;

export const CMS_ROUTES = {
  list: (resource: string) => `/dashboard/collections/${resource}`,
  create: (resource: string) => `/dashboard/collections/${resource}/new`,
  edit: (resource: string, id: string) => `/dashboard/collections/${resource}/${id}`,
};
