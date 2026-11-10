import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}${ROUTES.solutions}/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}${ROUTES.eOffice}/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}${ROUTES.eOfficeEmail}/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}${ROUTES.delva}/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}${ROUTES.industries}/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}${ROUTES.aboutUs}/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}${ROUTES.blog}/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}${ROUTES.caseStudy}/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}${ROUTES.contactUs}/`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
