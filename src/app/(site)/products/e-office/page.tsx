import type { Metadata } from "next";
import { PageFlow } from "@/components/site/layout/page-flow";
import { ClientsSection } from "@/components/site/sections/clients-section";
import {
  EOfficeBenefitsSection,
  EOfficeFeaturesSection,
  EOfficeHero,
  EOfficeVideoSection,
} from "@/components/site/sections/products/e-office-sections";
import { FaqSection } from "@/components/site/sections/products/faq-section";
import { PricingSection } from "@/components/site/sections/products/pricing-section";
import { ProductContactSection } from "@/components/site/sections/products/product-contact-section";
import { TestimonialsSection } from "@/components/site/sections/testimonials-section";
import { FaqJsonLd } from "@/components/site/seo/faq-json-ld";
import {
  E_OFFICE_CLIENTS,
  E_OFFICE_CONTACT,
  E_OFFICE_FAQ,
  E_OFFICE_PAGE,
  E_OFFICE_PRICING,
  E_OFFICE_TESTIMONIALS,
} from "@/content/products";
import { ROUTES } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: E_OFFICE_PAGE.metaTitle,
  description: E_OFFICE_PAGE.metaDescription,
  path: ROUTES.eOffice,
});

export default function EOfficePage() {
  return (
    <PageFlow>
      <EOfficeHero />
      <EOfficeVideoSection />
      <EOfficeFeaturesSection />
      <EOfficeBenefitsSection />
      <ClientsSection clients={E_OFFICE_CLIENTS} />
      <TestimonialsSection
        label={E_OFFICE_TESTIMONIALS.label}
        title={E_OFFICE_TESTIMONIALS.title}
        testimonials={E_OFFICE_TESTIMONIALS.items}
      />
      <PricingSection pricing={E_OFFICE_PRICING} align="center" />
      <FaqSection faq={E_OFFICE_FAQ} layout="e-office" />
      <ProductContactSection contact={E_OFFICE_CONTACT} layout="e-office" source="website-product-e-office" />
      <FaqJsonLd items={E_OFFICE_FAQ.items} />
    </PageFlow>
  );
}
