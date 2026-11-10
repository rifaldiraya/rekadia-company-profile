import type { Metadata } from "next";
import { PageFlow } from "@/components/site/layout/page-flow";
import { ClientsSection } from "@/components/site/sections/clients-section";
import {
  EOfficeEmailFeaturesSection,
  EOfficeEmailHero,
} from "@/components/site/sections/products/e-office-email-sections";
import { FaqSection } from "@/components/site/sections/products/faq-section";
import { PricingSection } from "@/components/site/sections/products/pricing-section";
import { ProductContactSection } from "@/components/site/sections/products/product-contact-section";
import { TestimonialsSection } from "@/components/site/sections/testimonials-section";
import { FaqJsonLd } from "@/components/site/seo/faq-json-ld";
import {
  E_OFFICE_EMAIL_CLIENTS,
  E_OFFICE_EMAIL_CONTACT,
  E_OFFICE_EMAIL_FAQ,
  E_OFFICE_EMAIL_PAGE,
  E_OFFICE_EMAIL_PRICING,
  E_OFFICE_EMAIL_TESTIMONIALS,
} from "@/content/products";
import { ROUTES } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: E_OFFICE_EMAIL_PAGE.metaTitle,
  description: E_OFFICE_EMAIL_PAGE.metaDescription,
  path: ROUTES.eOfficeEmail,
});

export default function EOfficeEmailPage() {
  return (
    <PageFlow>
      <EOfficeEmailHero />
      <EOfficeEmailFeaturesSection />
      <PricingSection pricing={E_OFFICE_EMAIL_PRICING} align="start" />
      <ClientsSection clients={E_OFFICE_EMAIL_CLIENTS} />
      <TestimonialsSection
        label={E_OFFICE_EMAIL_TESTIMONIALS.label}
        title={E_OFFICE_EMAIL_TESTIMONIALS.title}
        testimonials={E_OFFICE_EMAIL_TESTIMONIALS.items}
      />
      <FaqSection faq={E_OFFICE_EMAIL_FAQ} layout="email" />
      <ProductContactSection
        contact={E_OFFICE_EMAIL_CONTACT}
        layout="email"
        source="website-product-e-office-email"
      />
      <FaqJsonLd items={E_OFFICE_EMAIL_FAQ.items} />
    </PageFlow>
  );
}
