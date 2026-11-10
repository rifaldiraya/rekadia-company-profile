import type { Metadata } from "next";
import { ContactSection } from "@/components/site/sections/contact-section";
import { PageBanner } from "@/components/site/sections/page-banner";
import { CONTACT_PAGE } from "@/content/contact";
import { ROUTES } from "@/content/site";

export const metadata: Metadata = {
  title: CONTACT_PAGE.title,
  description: CONTACT_PAGE.description,
  alternates: { canonical: ROUTES.contactUs },
};

export default function ContactPage() {
  return (
    <>
      <PageBanner title={CONTACT_PAGE.title} description={CONTACT_PAGE.description} background={CONTACT_PAGE.banner} />
      <ContactSection />
    </>
  );
}
