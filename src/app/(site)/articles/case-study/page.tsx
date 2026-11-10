import type { Metadata } from "next";
import { PageFlow } from "@/components/site/layout/page-flow";
import { CaseStudyListSection } from "@/components/site/sections/articles/article-list-sections";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageBanner } from "@/components/site/sections/page-banner";
import { ARTICLES_BANNER_DESCRIPTION, CASE_STUDY_PAGE } from "@/content/articles";
import { ROUTES } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: CASE_STUDY_PAGE.metaTitle,
  description: CASE_STUDY_PAGE.metaDescription,
  path: ROUTES.caseStudy,
});

export default function CaseStudyPage() {
  return (
    <PageFlow>
      <PageBanner title={CASE_STUDY_PAGE.title} description={ARTICLES_BANNER_DESCRIPTION} />
      <CaseStudyListSection />
      <CtaSection />
    </PageFlow>
  );
}
