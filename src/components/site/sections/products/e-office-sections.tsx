import Image from "next/image";
import Link from "next/link";
import { BellDot, CloudUpload, FileLock2, FileText, Network, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/site/ui/section-label";
import {
  E_OFFICE_BENEFITS,
  E_OFFICE_FEATURES,
  E_OFFICE_HERO,
  E_OFFICE_VIDEO,
  type BenefitCard,
  type EOfficeFeatureIcon,
} from "@/content/products";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/content";

const FEATURE_ICONS: Record<EOfficeFeatureIcon, LucideIcon> = {
  document: FileText,
  approval: CloudUpload,
  security: FileLock2,
  notification: BellDot,
  integration: Network,
};

function HeroButtons({ whatsapp, demo, className }: { whatsapp: NavLink; demo: NavLink; className?: string }) {
  const base = "flex h-[50px] w-full items-center justify-center rounded px-[15px] font-montserrat text-base";
  return (
    <div className={className}>
      <a
        href={whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, "btn-gradient font-semibold text-white")}
      >
        {whatsapp.label}
      </a>
      <Link href={demo.href} className={cn(base, "border border-body bg-white font-medium text-body")}>
        {demo.label}
      </Link>
    </div>
  );
}

export function EOfficeHero() {
  const { logo, image, desktopCtas, mobileCtas } = E_OFFICE_HERO;
  return (
    <section aria-labelledby="e-office-hero-heading" className="mx-[10%] mt-[60px] motion-safe:animate-fade-in">
      <div className="mb-5 grid grid-cols-[1fr_1fr] gap-9 max-lg:mb-0 max-lg:flex max-lg:flex-col max-lg:items-center max-sm:grid max-sm:grid-cols-1 max-sm:justify-center xl:h-[420px]">
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="max-md:text-center">
            <Image
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt={logo.alt}
              priority
              className="inline-block h-auto w-28"
            />
            <h1
              id="e-office-hero-heading"
              className="mt-5 mb-2.5 font-montserrat text-4xl leading-[100%] font-semibold text-[#27b7d5] max-sm:text-[1.9em]"
            >
              <span className="text-[32px] text-ink max-sm:text-2xl">{E_OFFICE_HERO.title}</span>
            </h1>
          </div>
          <p className="text-justify font-montserrat text-base text-body max-md:text-center">
            {E_OFFICE_HERO.description}
          </p>
          <div className="hidden w-full flex-col gap-3 pb-11 max-lg:flex max-md:items-center max-md:self-center">
            <HeroButtons {...mobileCtas} className="mt-8 flex w-full gap-3 max-sm:flex-col" />
          </div>
          <HeroButtons {...desktopCtas} className="flex w-full items-center justify-center gap-3 max-lg:hidden" />
        </div>
        <div className="text-center max-lg:block max-lg:w-full">
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            priority
            sizes="(min-width: 992px) 40vw, 80vw"
            className="inline-block h-auto max-w-full"
          />
        </div>
      </div>
    </section>
  );
}

export function EOfficeVideoSection() {
  return (
    <section aria-label="E-Office video" className="mx-[10%] flex flex-col motion-safe:animate-rise-in">
      <div className="relative mt-[60px] h-0 overflow-hidden rounded-xl pb-[56.25%]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${E_OFFICE_VIDEO.youtubeId}`}
          title={E_OFFICE_VIDEO.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: (typeof E_OFFICE_FEATURES.items)[number] }) {
  const Icon = FEATURE_ICONS[feature.icon];
  return (
    <li className="flex min-h-full w-full max-w-[350px] flex-col gap-6 rounded-lg border border-muted px-4 py-5 hover:border-2">
      <Icon aria-hidden="true" size={32} strokeWidth={1.5} className="text-brand-light" />
      <div className="flex flex-col gap-1.5 font-montserrat text-base text-ink">
        <h3 className="font-semibold">{feature.title}</h3>
        <p className="h-full">{feature.description}</p>
      </div>
    </li>
  );
}

export function EOfficeFeaturesSection() {
  const firstRow = E_OFFICE_FEATURES.items.slice(0, 3);
  const secondRow = E_OFFICE_FEATURES.items.slice(3);
  return (
    <section aria-labelledby="e-office-features-heading" className="mx-[10%] mt-[60px]">
      <div className="flex w-[70%] flex-col gap-3 max-lg:w-full">
        <SectionLabel className="mb-3 max-lg:justify-center">{E_OFFICE_FEATURES.label}</SectionLabel>
        <h2
          id="e-office-features-heading"
          className="font-montserrat text-[32px] leading-none font-semibold text-ink max-lg:text-center max-sm:text-2xl"
        >
          {E_OFFICE_FEATURES.title}
        </h2>
      </div>
      <div className="mt-9">
        <ul className="grid auto-rows-[minmax(auto,1fr)] grid-cols-[1fr_1fr_1fr] grid-rows-[auto] place-content-center items-stretch justify-items-center gap-4 max-sm:grid-cols-1">
          {firstRow.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </ul>
        <ul className="mt-4 flex w-full items-stretch justify-center gap-3 max-sm:flex-col">
          {secondRow.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </ul>
      </div>
    </section>
  );
}

const BENEFIT_TITLE: Record<NonNullable<BenefitCard["titleStyle"]>, string> = {
  small: "text-base",
  bold: "font-bold",
};

export function EOfficeBenefitsSection() {
  return (
    <section aria-labelledby="e-office-benefits-heading" className="mx-[10%] mt-[60px]">
      <div className="flex flex-col gap-3">
        <SectionLabel className="mb-3 max-lg:justify-center">{E_OFFICE_BENEFITS.label}</SectionLabel>
        <h2
          id="e-office-benefits-heading"
          className="font-montserrat text-[32px] font-semibold text-ink max-lg:text-center max-md:leading-none max-sm:text-2xl"
        >
          {E_OFFICE_BENEFITS.title}
        </h2>
      </div>
      <ul className="mt-9 grid grid-cols-[1fr_1fr_1fr_1fr] gap-4 max-lg:grid-cols-[1fr_1fr] max-sm:grid-cols-1">
        {E_OFFICE_BENEFITS.cards.map((card) => (
          <li
            key={card.title}
            className="relative isolate flex h-[400px] flex-col justify-end p-8 motion-safe:scroll-fade-in-29"
          >
            <Image src={card.image.src} alt="" fill sizes="(min-width: 992px) 20vw, 80vw" className="-z-10 object-cover" />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-black/64" />
            <div className="flex flex-col gap-3 font-montserrat text-xl font-semibold text-surface">
              <h3 className={cn(card.titleStyle && BENEFIT_TITLE[card.titleStyle])}>{card.title}</h3>
              <p className="text-base font-normal">{card.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
