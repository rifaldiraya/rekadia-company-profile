import { Fragment } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/site/ui/button-link";
import { HERO, HERO_STATS } from "@/content/home";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="mx-[10%] mt-[60px] motion-safe:animate-fade-in">
      <div className="-mb-10 flex flex-col items-center gap-4 lg:mb-0 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="mb-10 flex max-w-full flex-col items-center gap-3 lg:mb-0 lg:items-start lg:gap-0">
          <h1
            id="hero-heading"
            className="mb-2.5 text-center font-montserrat text-2xl leading-none font-semibold text-ink sm:text-[32px] lg:mt-5 lg:leading-[35.2px] xl:leading-[44px] lg:text-left"
          >
            {HERO.title}
          </h1>
          <p className="mb-8 text-center font-montserrat text-base leading-none text-body lg:text-left">
            {HERO.description}
          </p>
          <div className="flex gap-3">
            <ButtonLink href={HERO.primaryCta.href} variant="primary" className="max-sm:leading-none">
              {HERO.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={HERO.secondaryCta.href} variant="ghost" className="max-sm:leading-none">
              {HERO.secondaryCta.label}
            </ButtonLink>
          </div>
          <dl className="mt-[46px] flex h-[90px] items-center justify-start gap-6 leading-[14px] max-sm:justify-center max-sm:gap-3">
            {HERO_STATS.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 && <span aria-hidden="true" className="h-full w-0.5 shrink-0 bg-[#b0bac9]" />}
                <div className="flex h-full min-w-[120px] flex-col-reverse justify-center gap-6 max-sm:w-full max-sm:min-w-[80px] max-sm:items-center max-sm:text-center 2xl:min-w-[160px]">
                  <dt className="font-montserrat text-base text-muted max-sm:text-sm">{stat.label}</dt>
                  <dd className="font-montserrat text-[36px] font-medium text-ink max-sm:text-2xl">{stat.value}</dd>
                </div>
              </Fragment>
            ))}
          </dl>
        </div>
        <div className="mb-10 w-full lg:mb-0">
          <Image
            src={HERO.image.src}
            width={HERO.image.width}
            height={HERO.image.height}
            alt={HERO.image.alt}
            priority
            sizes="(min-width: 992px) 40vw, 80vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
