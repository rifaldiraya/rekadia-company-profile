import { Fragment } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/site/ui/section-label";
import { E_OFFICE_EMAIL_FEATURES, E_OFFICE_EMAIL_HERO } from "@/content/products";
import { ProductCtaLinks } from "./product-cta-links";

export function EOfficeEmailHero() {
  const { image } = E_OFFICE_EMAIL_HERO;
  return (
    <section aria-labelledby="e-office-email-hero-heading" className="mx-[10%] mt-[60px]">
      <div className="-mb-10 flex flex-col items-center gap-4 lg:mb-0 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:justify-between">
        <div className="mb-10 flex max-w-full flex-col items-center gap-3 lg:mb-0 lg:items-start lg:gap-0">
          <SectionLabel className="mb-3 max-lg:justify-center">{E_OFFICE_EMAIL_HERO.label}</SectionLabel>
          <h1
            id="e-office-email-hero-heading"
            className="mb-2.5 text-[2.2rem] leading-none text-ink max-lg:flex max-lg:justify-center max-md:leading-[44px] max-sm:text-2xl lg:mt-5 xl:leading-[44px]"
          >
            <span className="font-montserrat text-[32px] leading-none font-semibold max-lg:text-center max-sm:text-2xl">
              {E_OFFICE_EMAIL_HERO.title}
            </span>
          </h1>
          <p className="mb-8 font-montserrat text-base leading-none text-body max-lg:text-center">
            {E_OFFICE_EMAIL_HERO.description}
          </p>
          <ProductCtaLinks {...E_OFFICE_EMAIL_HERO.ctas} />
          <dl className="mt-[46px] flex h-[90px] items-center justify-start gap-6 leading-[14px] max-sm:justify-center max-sm:gap-3">
            {E_OFFICE_EMAIL_HERO.stats.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 && <span aria-hidden="true" className="h-full w-0.5 shrink-0 bg-[#b0bac9]" />}
                <div className="flex h-full min-w-[120px] flex-col-reverse justify-center gap-6 max-sm:w-full max-sm:min-w-[80px] max-sm:items-center max-sm:text-center 2xl:w-[120px] 2xl:min-w-[160px]">
                  <dt className="font-montserrat text-base text-muted max-sm:text-sm">{stat.label}</dt>
                  <dd className="font-montserrat text-[36px] font-medium text-ink max-sm:text-2xl">
                    {stat.value}
                    <span className="text-base text-brand-light">{stat.unit}</span>
                  </dd>
                </div>
              </Fragment>
            ))}
          </dl>
        </div>
        <div className="mb-10 flex max-w-full flex-col items-start lg:mb-0">
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            priority
            sizes="(min-width: 992px) 40vw, 80vw"
            className="h-auto max-w-full"
          />
        </div>
      </div>
    </section>
  );
}

export function EOfficeEmailFeaturesSection() {
  return (
    <section aria-labelledby="e-office-email-features-heading" className="mx-[10%] mt-[60px] flex flex-col max-lg:items-center">
      <div className="flex w-1/2 flex-col gap-3 font-montserrat text-[#333] max-lg:w-full max-lg:text-center">
        <SectionLabel className="mb-3 max-lg:justify-center">{E_OFFICE_EMAIL_FEATURES.label}</SectionLabel>
        <h2 id="e-office-email-features-heading" className="text-[32px] leading-none font-semibold max-sm:text-2xl">
          {E_OFFICE_EMAIL_FEATURES.title}
        </h2>
        <p className="text-base leading-none">{E_OFFICE_EMAIL_FEATURES.description}</p>
      </div>
      <ul className="mt-6 grid grid-cols-[1fr_1fr_1fr] gap-4 text-[#333] max-md:grid-cols-[1fr_1fr] max-sm:grid-cols-1">
        {E_OFFICE_EMAIL_FEATURES.items.map((feature) => (
          <li key={feature.title} className="flex min-h-60 flex-col gap-6 rounded-lg border border-muted px-4 py-5">
            <span
              aria-hidden="true"
              className="block size-10 text-center text-[34px] leading-10 motion-safe:hover:animate-jiggle"
            >
              {feature.emoji}
            </span>
            <div className="flex flex-col gap-1.5 font-montserrat">
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
            <p className="w-fit rounded-full bg-[#eceef2] px-3 py-2 font-montserrat text-xs font-medium text-ink">
              {feature.badge}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
