import { ARTICLES_BANNER_DESCRIPTION } from "@/content/articles";
import { IMAGES } from "@/content/images";
import type { ImageAsset } from "@/types/content";

export interface Industry {
  title: string;
  description: string;
  image: ImageAsset;
}

export const INDUSTRIES_PAGE = {
  title: "Industries",
  metaTitle: "Industries We Serve | Rekadia Digital Transformation",
  metaDescription:
    "Rekadia drives business growth through digital transformation across corporate, education, finance, healthcare, and manufacturing with AI-powered solutions.",
  bannerDescription: ARTICLES_BANNER_DESCRIPTION,
  label: "Industrial Sectors",
  heading: "Rekadia is more than just AI",
  description: "We handle all your business IT needs",
};

/** Verbatim from the live CMS, including the first card's "Innovations in Healthcare" title. */
export const INDUSTRIES: Industry[] = [
  {
    title: "Innovations in Healthcare",
    description: "Ensure your business operations run smoothly with more efficient and time-saving manual processes.",
    image: IMAGES.industryCorporate,
  },
  {
    title: "Education",
    description:
      "Digitizing educational administration to make it faster, more structured, and easier to analyze for decision-making.",
    image: IMAGES.industryEducation,
  },
  {
    title: "Finance",
    description: "Optimize your audit and financial reporting processes with an integrated system.",
    image: IMAGES.industryFinance,
  },
  {
    title: "Healthcare",
    description:
      "Improve the efficiency of healthcare services through faster and more accurate data management and administrative processes.",
    image: IMAGES.industryHealthcare,
  },
  {
    title: "Manufacturing",
    description:
      "Maximize operational productivity with a system that supports real-time monitoring, auditing, and decision-making.",
    image: IMAGES.industryManufacturing,
  },
];
