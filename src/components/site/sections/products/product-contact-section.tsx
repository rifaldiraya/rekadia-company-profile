import Image from "next/image";
import { ContactForm } from "@/components/site/forms/contact-form";
import { SectionLabel } from "@/components/site/ui/section-label";
import { CONTACT_FORM_COPY } from "@/content/contact";
import { IMAGES } from "@/content/images";
import type { ProductContact } from "@/content/products";
import { cn } from "@/lib/cn";
import type { ContactSource } from "@/types/contact";

/** Each product page lays out its consultation block slightly differently on the original. */
type Layout = "e-office" | "email" | "delva";

const SECTION: Record<Layout, string> = {
  "e-office": "mt-[60px] grid items-center gap-4 px-[10%] py-10 lg:grid-cols-[1fr_1fr]",
  email: "mt-[60px] flex items-center gap-[60px] px-[10%] py-[42px] max-lg:flex-col",
  delva: "grid gap-4 bg-[#f2f7f6] px-[10%] py-9 max-sm:block max-sm:px-[5%] lg:grid-cols-[1fr_1fr]",
};

const INTRO: Record<Layout, string> = {
  "e-office": "flex flex-col gap-3",
  email: "flex flex-1 flex-col justify-center gap-3 max-lg:items-center",
  delva: "flex flex-col items-start justify-center gap-[18px] max-lg:items-center",
};

const TITLE: Record<Layout, string> = {
  "e-office": "text-[32px] leading-none max-lg:text-center max-sm:text-2xl",
  email: "text-4xl leading-none max-md:text-center max-sm:text-2xl",
  delva: "w-4/5 text-[46px] leading-[100%] max-lg:w-[70%] max-lg:text-center max-md:text-2xl",
};

interface ProductContactSectionProps {
  contact: ProductContact;
  layout: Layout;
  source: ContactSource;
}

export function ProductContactSection({ contact, layout, source }: ProductContactSectionProps) {
  const isEmail = layout === "email";
  const isDelva = layout === "delva";
  return (
    <section id="contact" aria-labelledby="product-contact-heading" className={cn("relative isolate", SECTION[layout])}>
      {!isDelva && <Image src={IMAGES.ctaBackground.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />}

      <div className={INTRO[layout]}>
        <SectionLabel className="mb-3 max-lg:justify-center">{contact.label}</SectionLabel>
        <h2
          id="product-contact-heading"
          className={cn("font-montserrat font-semibold whitespace-pre-line text-ink", TITLE[layout])}
        >
          {contact.title}
        </h2>
        <p
          className={cn(
            "font-montserrat text-base text-body max-lg:text-center",
            isEmail && "leading-none",
            isDelva && "w-4/5 max-sm:text-sm",
          )}
        >
          {contact.description}
        </p>
      </div>

      <div
        className={cn(
          "rounded-lg bg-white p-8",
          isEmail ? "flex-1 max-sm:w-full" : "max-sm:w-full",
          isDelva && "max-sm:mt-9",
        )}
      >
        <h3
          className={cn(
            "font-montserrat text-xl leading-none font-semibold max-lg:text-center",
            isEmail ? "text-[#333]" : "text-ink",
          )}
        >
          {contact.formTitle ?? CONTACT_FORM_COPY.title}
        </h3>
        <p className={cn("font-montserrat text-xs max-lg:text-center", isEmail ? "text-[#333]" : "mt-1.5 text-body")}>
          {contact.formDescription ?? CONTACT_FORM_COPY.description}
        </p>
        <ContactForm source={source} variant={isEmail ? "email" : "default"} />
      </div>
    </section>
  );
}
