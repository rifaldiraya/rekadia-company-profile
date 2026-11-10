import type { Metadata } from "next";
import { IMAGES } from "@/content/images";
import { COMPANY } from "@/content/site";

/**
 * Metadata for a page with its own social title. Next.js replaces (rather than merges) a parent's
 * `openGraph`/`twitter` objects, so the shared fields are repeated here.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: COMPANY.brand,
      locale: "en_US",
      title,
      description,
      url: path,
      images: [{ url: IMAGES.ogImage.src, width: IMAGES.ogImage.width, height: IMAGES.ogImage.height }],
    },
    twitter: { card: "summary_large_image", title, description, images: [IMAGES.ogImage.src] },
  };
}
