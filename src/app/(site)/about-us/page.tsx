import type { Metadata } from "next";
import { PageFlow } from "@/components/site/layout/page-flow";
import {
  AboutIntroSection,
  AboutPhilosophySection,
  AboutVisionMissionSection,
} from "@/components/site/sections/about-sections";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageBanner } from "@/components/site/sections/page-banner";
import { ABOUT_PAGE } from "@/content/about";
import { ROUTES } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: ABOUT_PAGE.metaTitle,
  description: ABOUT_PAGE.metaDescription,
  path: ROUTES.aboutUs,
});

export default function AboutPage() {
  return (
    <PageFlow>
      <PageBanner title={ABOUT_PAGE.title} description={ABOUT_PAGE.bannerDescription} />
      <AboutIntroSection />
      <AboutVisionMissionSection />
      <AboutPhilosophySection />
      <CtaSection />
    </PageFlow>
  );
}
