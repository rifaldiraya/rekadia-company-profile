import type { Metadata } from "next";
import { PageFlow } from "@/components/site/layout/page-flow";
import { CtaSection } from "@/components/site/sections/cta-section";
import { IndustriesSection } from "@/components/site/sections/industries-section";
import { PageBanner } from "@/components/site/sections/page-banner";
import { INDUSTRIES_PAGE } from "@/content/industries";
import { ROUTES } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: INDUSTRIES_PAGE.metaTitle,
  description: INDUSTRIES_PAGE.metaDescription,
  path: ROUTES.industries,
});

export default function IndustriesPage() {
  return (
    <PageFlow>
      <PageBanner title={INDUSTRIES_PAGE.title} description={INDUSTRIES_PAGE.bannerDescription} />
      <IndustriesSection />
      <CtaSection />
    </PageFlow>
  );
}
