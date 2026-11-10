import type { Metadata } from "next";
import { PageFlow } from "@/components/site/layout/page-flow";
import {
  DelvaCaseStudiesSection,
  DelvaFeaturesSection,
  DelvaHero,
  DelvaVideoSection,
  DelvaWorkflowSection,
} from "@/components/site/sections/products/delva-sections";
import { ProductContactSection } from "@/components/site/sections/products/product-contact-section";
import { DELVA_CONTACT, DELVA_PAGE } from "@/content/products";
import { ROUTES } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: DELVA_PAGE.metaTitle,
  description: DELVA_PAGE.metaDescription,
  path: ROUTES.delva,
});

export default function DelvaPage() {
  return (
    <PageFlow>
      <DelvaHero />
      <DelvaVideoSection />
      <DelvaFeaturesSection />
      <DelvaWorkflowSection />
      <DelvaCaseStudiesSection />
      <ProductContactSection contact={DELVA_CONTACT} layout="delva" source="website-product-delva" />
    </PageFlow>
  );
}
