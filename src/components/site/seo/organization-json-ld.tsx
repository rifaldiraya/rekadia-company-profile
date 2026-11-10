import { IMAGES } from "@/content/images";
import { COMPANY, SEO, SITE_URL, SOCIAL_LINKS } from "@/content/site";

const SAME_AS_PLATFORMS = new Set(["facebook", "instagram", "linkedin", "youtube", "tiktok"]);

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.brand,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: new URL(IMAGES.logo.src, SITE_URL).toString(),
    email: COMPANY.email,
    foundingDate: String(COMPANY.foundingYear),
    description: SEO.description,
    sameAs: SOCIAL_LINKS.filter((link) => SAME_AS_PLATFORMS.has(link.platform)).map((link) => link.href),
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "AIA Central Lv 31, Jakarta",
        addressLocality: "Jakarta",
        addressRegion: "JKT",
        postalCode: "12930",
        addressCountry: "ID",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
