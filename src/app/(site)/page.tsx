import { AiSolutionsSection } from "@/components/site/sections/ai-solutions-section";
import { BusinessItSection } from "@/components/site/sections/business-it-section";
import { ClientsSection } from "@/components/site/sections/clients-section";
import { CtaSection } from "@/components/site/sections/cta-section";
import { FeaturesSection } from "@/components/site/sections/features-section";
import { HeroSection } from "@/components/site/sections/hero-section";
import { ProductsSection } from "@/components/site/sections/products-section";
import { TestimonialsSection } from "@/components/site/sections/testimonials-section";
import { OrganizationJsonLd } from "@/components/site/seo/organization-json-ld";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <HeroSection />
      <FeaturesSection />
      <AiSolutionsSection />
      <BusinessItSection />
      <ProductsSection />
      <ClientsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
