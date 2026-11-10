import { Boxes, Cpu, Store, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/site/ui/section-label";
import { BUSINESS_SECTION, BUSINESS_SERVICES } from "@/content/home";
import type { BusinessServiceIcon } from "@/types/content";

const ICONS: Record<BusinessServiceIcon, LucideIcon> = {
  "business-applications": Store,
  "it-infrastructure": Boxes,
  "hardware-support": Cpu,
};

export function BusinessItSection() {
  return (
    <section aria-labelledby="business-it-heading" className="mx-[10%] mt-[60px] flex flex-col items-center gap-3">
      <SectionLabel>{BUSINESS_SECTION.label}</SectionLabel>
      <h2
        id="business-it-heading"
        className="text-center font-montserrat text-[32px] leading-none font-semibold text-ink max-sm:text-2xl"
      >
        {BUSINESS_SECTION.title}
      </h2>
      <p className="text-center font-montserrat text-base text-body">{BUSINESS_SECTION.description}</p>

      <ul className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {BUSINESS_SERVICES.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <li
              key={service.title}
              className="flex min-h-[146px] flex-col gap-5 rounded-lg border border-muted px-3 py-5 shadow-nav transition-shadow duration-150 hover:shadow-[inset_0_0_0_2px_var(--color-muted),0_2px_5px_#0003] max-sm:items-center"
            >
              <Icon aria-hidden="true" size={20} strokeWidth={1.75} className="text-brand" />
              <div className="font-montserrat max-sm:text-center">
                <h3 className="text-base font-semibold text-ink">{service.title}</h3>
                <p className="text-body">{service.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
