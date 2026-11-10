import Link from "next/link";
import { SectionLabel } from "@/components/site/ui/section-label";
import { ROUTES } from "@/content/site";
import type { ProductPricing } from "@/content/products";
import { cn } from "@/lib/cn";
import type { PricingPlan } from "@/types/content";
import { CheckIcon, CustomPlanIcon } from "./product-icons";

const TONES: Record<PricingPlan["tone"], string> = {
  green: "text-[#66e075]",
  cyan: "text-brand-light",
  orange: "text-[#f9a307]",
};

function PricingCard({ plan, whatsappHref }: { plan: PricingPlan; whatsappHref: string }) {
  return (
    <li className="flex h-full flex-col items-center gap-3 rounded-lg border border-[#eceef2] bg-white p-8 shadow-form 2xl:rounded-[25px]">
      <div className="flex flex-col gap-3 text-center font-montserrat font-semibold">
        <h3 className={cn("text-lg leading-none", TONES[plan.tone])}>{plan.name}</h3>
        <div className="flex flex-col justify-center gap-1.5">
          <p className="text-[32px] leading-[120%] text-[#333] max-sm:text-2xl">
            {plan.price}
            {plan.period && <span className="text-xs">{plan.period}</span>}
          </p>
          {plan.originalPrice && (
            <p className="text-base text-[#e62d2d] line-through">
              <span className="sr-only">Normal price </span>
              {plan.originalPrice}
            </p>
          )}
        </div>
      </div>

      <div className="mt-2.5 flex w-full items-center justify-center gap-3 font-montserrat font-semibold">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-brand-light px-[15px] py-[9px] text-center text-brand-light transition-colors hover:bg-brand-light/10"
        >
          WhatsApp Now
        </a>
        <Link
          href={ROUTES.contactUs}
          className="rounded-lg bg-[linear-gradient(90deg,#27b7d5,#145f6f)] px-[15px] py-[9px] text-center text-surface transition hover:brightness-110"
        >
          Schedule a Demo
        </Link>
      </div>

      <ul className="mt-2.5 flex flex-col gap-3 font-montserrat text-base text-ink max-lg:w-full">
        {plan.features.map((feature) => (
          <li key={feature.label} className="flex gap-3.5">
            <CheckIcon muted={!feature.included} />
            <span className={cn(!feature.included && "text-muted")}>
              {feature.label}
              {!feature.included && <span className="sr-only"> (not included)</span>}
            </span>
          </li>
        ))}
        {plan.customFeature && (
          <li className="flex gap-3.5 font-medium">
            <CustomPlanIcon />
            {plan.customFeature}
          </li>
        )}
      </ul>
    </li>
  );
}

interface PricingSectionProps {
  pricing: ProductPricing;
  /** `center` is the E-Office layout; `start` is the left-aligned E-Office Email layout. */
  align: "center" | "start";
}

export function PricingSection({ pricing, align }: PricingSectionProps) {
  const centered = align === "center";
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className={cn(
        centered ? "my-[52px] flex flex-col items-center gap-[52px] px-[10%]" : "mx-[10%] mt-[60px]",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          centered ? "items-center text-center max-lg:block" : "w-1/2 max-lg:w-full max-lg:items-center",
        )}
      >
        <SectionLabel className="mb-3 max-lg:justify-center">{pricing.label}</SectionLabel>
        <h2
          id="pricing-heading"
          className={cn(
            "font-montserrat text-[32px] leading-none whitespace-pre-line",
            centered ? "font-medium text-[#111] max-sm:text-2xl" : "font-semibold text-ink max-lg:text-center",
          )}
        >
          {pricing.title}
        </h2>
      </div>

      <ul className="mt-9 grid w-full grid-cols-[1fr_1fr_1fr] place-items-center gap-5 max-lg:flex max-lg:flex-col 2xl:gap-20">
        {pricing.plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} whatsappHref={pricing.whatsappHref} />
        ))}
      </ul>
    </section>
  );
}
