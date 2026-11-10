import Image from "next/image";
import { ButtonLink } from "@/components/site/ui/button-link";
import { CTA_SECTION } from "@/content/home";

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate flex h-[460px] flex-col items-center justify-center gap-9 overflow-hidden px-[10%]"
    >
      <Image src={CTA_SECTION.background.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <h2
        id="cta-heading"
        className="text-center font-montserrat text-[32px] leading-none font-semibold text-ink max-sm:text-2xl"
      >
        {CTA_SECTION.title}
      </h2>
      <p className="font-montserrat text-base text-body max-md:text-center">{CTA_SECTION.description}</p>
      <ButtonLink href={CTA_SECTION.cta.href}>{CTA_SECTION.cta.label}</ButtonLink>
    </section>
  );
}
