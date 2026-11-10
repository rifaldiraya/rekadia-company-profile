import type { Metadata } from "next";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageBanner } from "@/components/site/sections/page-banner";
import { AiSolutionCardsSection } from "@/components/site/sections/solutions/ai-solution-cards-section";
import { ProcessSection } from "@/components/site/sections/solutions/process-section";
import { ResultsStrip } from "@/components/site/sections/solutions/results-strip";
import { SolutionGroupSection } from "@/components/site/sections/solutions/solution-group-section";
import { ROUTES } from "@/content/site";
import {
  BUSINESS_APPLICATIONS,
  DEVICES,
  IT_INFRASTRUCTURE,
  OFFICE_SOLUTIONS,
  SOLUTIONS_PAGE,
} from "@/content/solutions";

export const metadata: Metadata = {
  title: SOLUTIONS_PAGE.title,
  description: SOLUTIONS_PAGE.description,
  alternates: { canonical: ROUTES.solutions },
};

export default function SolutionsPage() {
  return (
    <>
      <PageBanner title={SOLUTIONS_PAGE.title} description={SOLUTIONS_PAGE.description} />
      <AiSolutionCardsSection />
      <ProcessSection />
      <SolutionGroupSection group={BUSINESS_APPLICATIONS} className="mt-[60px]" />
      <ResultsStrip />
      <SolutionGroupSection group={OFFICE_SOLUTIONS} className="mt-[60px]" />
      <SolutionGroupSection group={DEVICES} className="my-[60px]" />
      <SolutionGroupSection group={IT_INFRASTRUCTURE} columns={3} className="mt-[120px] mb-[60px] max-sm:mt-[60px]" />
      <CtaSection />
    </>
  );
}
