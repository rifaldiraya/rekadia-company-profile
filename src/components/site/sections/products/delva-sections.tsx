import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import {
  DELVA_CASE_STUDIES,
  DELVA_FEATURES,
  DELVA_HERO,
  DELVA_VIDEO,
  DELVA_WORKFLOW,
} from "@/content/products";
import { cn } from "@/lib/cn";
import { DelvaWorkflowTabs } from "./delva-workflow-tabs";

const openSans = localFont({
  src: "../../../../../node_modules/@fontsource/open-sans/files/open-sans-latin-600-normal.woff2",
  weight: "600",
  display: "swap",
});

const SOFT_SHADOW = "shadow-[0_2px_5px_#0003,0_2px_5px_#0003]";

/** Each screenshot is constrained differently on the original, in feature order. */
const FEATURE_IMAGE_FIT = ["max-h-[80%] max-w-[95%]", "max-h-[95%] max-w-[95%]", "max-w-[30%]", "max-h-[95%] max-w-[95%]"];

/** The original trims case-study summaries to 300 characters with a script. */
const truncateSummary = (text: string) => (text.length > 300 ? `${text.substring(0, 300)}...` : text);

export function DelvaHero() {
  const { logo, image, background, ctas } = DELVA_HERO;
  return (
    <section aria-labelledby="delva-hero-heading" className="relative isolate py-[60px] 2xl:h-[480px]">
      <Image src={background.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="mx-[10%] grid grid-cols-[1fr_1fr] gap-4 max-lg:flex max-lg:flex-col 2xl:place-items-center">
        <div className="flex flex-col gap-6 max-lg:items-center 2xl:h-full 2xl:justify-center">
          <Image src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} priority className="h-auto w-24" />
          <div className="flex flex-col gap-3 font-montserrat max-lg:text-center">
            <h1
              id="delva-hero-heading"
              className="text-[32px] leading-[100%] font-semibold text-ink max-sm:text-2xl"
            >
              {DELVA_HERO.title} <em className="text-[#008c9b]">{DELVA_HERO.titleAccent}</em>
            </h1>
            <p className="text-base text-[#8d9a9e] max-sm:text-sm">{DELVA_HERO.description}</p>
          </div>
          <div className="mt-3 flex gap-3 font-montserrat text-base max-lg:justify-center max-sm:items-center">
            <a
              href={ctas.demo.href}
              className="rounded bg-[linear-gradient(90deg,#006876,#00c2dc)] px-[15px] py-[9px] font-semibold text-white max-sm:px-3 max-sm:py-[5px] max-sm:text-center max-sm:text-xs"
            >
              {ctas.demo.label}
            </a>
            <Link
              href={ctas.team.href}
              className="rounded border border-brand-dark px-[15px] py-[9px] font-medium text-body max-sm:px-3 max-sm:py-[3px] max-sm:text-center"
            >
              <strong className="font-bold text-brand-dark max-sm:text-xs">{ctas.team.label}</strong>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 text-center max-lg:h-[360px] max-lg:items-center max-sm:h-full max-sm:w-full 2xl:h-full 2xl:w-full 2xl:items-center">
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            priority
            sizes="(min-width: 992px) 40vw, 80vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}

export function DelvaVideoSection() {
  return (
    <section aria-labelledby="delva-video-heading" className="mx-[10%] mt-[60px]">
      <h2
        id="delva-video-heading"
        className="w-1/2 font-montserrat text-[32px] leading-[100%] font-semibold text-[#333] max-sm:w-4/5 max-sm:text-2xl"
      >
        {DELVA_VIDEO.title}
      </h2>
      <div className="mt-6 h-[500px] rounded-xl max-lg:h-[386px] max-md:h-[320px] max-sm:h-[194px] xl:h-[595px] 2xl:h-[670px] min-[1920px]:h-[890px]">
        <div className="relative rounded-xl border-[32px] border-brand-dark pt-[56.1702%] max-lg:border-[24px] max-sm:border-[18px] xl:border-[36px]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${DELVA_VIDEO.youtubeId}`}
            title={DELVA_VIDEO.videoTitle}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        </div>
      </div>
    </section>
  );
}

export function DelvaFeaturesSection() {
  return (
    <section aria-labelledby="delva-features-heading" className="mt-[60px] bg-[#f6f9f8]">
      <div className="mx-[10%] pt-[60px] pb-[120px] max-sm:mx-0">
        <div className="flex w-[70%] flex-col gap-3 max-lg:w-full max-lg:text-center">
          <h2
            id="delva-features-heading"
            className="font-montserrat text-[32px] leading-[100%] font-semibold text-ink max-md:text-2xl"
          >
            {DELVA_FEATURES.title}
          </h2>
        </div>
        <ul className="mt-9 flex flex-col gap-6 min-[1920px]:gap-9">
          {DELVA_FEATURES.items.map((feature, index) => {
            const visual = (
              <div className="flex items-center justify-center bg-[#ebf9f9] bg-[linear-gradient(300deg,#dff6fc,#f0fbfd_58%,#d8f0f4)] p-6">
                <Image
                  src={feature.image.src}
                  width={feature.image.width}
                  height={feature.image.height}
                  alt={feature.image.alt}
                  sizes="100vw"
                  className={cn("h-auto w-auto rotate-3 rounded-lg", SOFT_SHADOW, FEATURE_IMAGE_FIT[index])}
                />
              </div>
            );
            return (
              <li key={feature.label} className="grid grid-cols-[1fr_1fr] max-md:grid-cols-1">
                {index % 2 === 0 && visual}
                <div className="flex flex-col gap-6 bg-[#f9fdfd] px-12 py-14 font-montserrat">
                  <p className="font-medium text-brand-dark">{feature.label}</p>
                  <h3 className="text-[32px] leading-[100%] font-semibold text-[#333] max-sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-black">{feature.description}</p>
                </div>
                {index % 2 === 1 && visual}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function DelvaWorkflowSection() {
  return (
    <section aria-labelledby="delva-workflow-heading" className="bg-[#f6f9f8] py-[60px]">
      <div className="mx-[10%] flex flex-col gap-3">
        <div className="flex w-3/5 flex-col gap-3 font-montserrat max-sm:w-full">
          <h2 id="delva-workflow-heading" className="text-[32px] leading-[100%] font-semibold text-[#333]">
            {DELVA_WORKFLOW.title}
          </h2>
          <p className="text-[#64767b]">{DELVA_WORKFLOW.description}</p>
        </div>
        <div className="mt-3 w-full">
          <DelvaWorkflowTabs steps={DELVA_WORKFLOW.steps} numberClassName={openSans.className} />
        </div>
      </div>
    </section>
  );
}

export function DelvaCaseStudiesSection() {
  const { background } = DELVA_CASE_STUDIES;
  return (
    <section aria-labelledby="delva-case-studies-heading" className="relative isolate bg-[#074f5d] py-[60px]">
      <Image src={background.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="mx-[10%] max-sm:mx-[5%]">
        <div className="flex flex-col gap-6 font-montserrat">
          <p className="font-semibold text-[#8ceaf0]">{DELVA_CASE_STUDIES.label}</p>
          <h2
            id="delva-case-studies-heading"
            className="text-[32px] font-semibold text-white max-lg:leading-[100%] max-sm:text-2xl"
          >
            {DELVA_CASE_STUDIES.title}
          </h2>
          <p className="font-medium text-[#d1e1e4]">{DELVA_CASE_STUDIES.description}</p>
        </div>
        <ul className="mt-8 grid grid-cols-[1fr_1fr_1fr] max-md:grid-cols-1">
          {DELVA_CASE_STUDIES.items.map((study) => (
            <li key={study.href} className="px-2.5">
              <article className={cn("h-[550px] rounded-xl bg-white px-4 py-3 max-md:mb-6", SOFT_SHADOW)}>
                <div className="flex h-full flex-col justify-between gap-6 font-montserrat">
                  <div className="flex flex-col gap-3">
                    <div className="flex h-10 items-center justify-between">
                      <Image
                        src={study.logo.src}
                        width={study.logo.width}
                        height={study.logo.height}
                        alt={study.logo.alt}
                        className="h-auto w-[30%] max-w-[40%]"
                      />
                      <p className="rounded-[3px] border border-[#074f5d] px-1.5 py-[3px] text-xs font-semibold text-[#074f5d] capitalize">
                        {study.category}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Image
                        src={study.image.src}
                        width={study.image.width}
                        height={study.image.height}
                        alt={study.image.alt}
                        sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 991px) 31vw, (max-width: 1919px) 32vw, 33vw"
                        className="h-auto w-full rounded-xl"
                      />
                      <h3 className="font-bold text-[#333]">{study.title}</h3>
                      <p className="text-[#66767b]">{truncateSummary(study.summary)}</p>
                    </div>
                  </div>
                  <div>
                    <a href={study.href} className="font-medium text-[#333]">
                      See Details →<span className="sr-only">: {study.title}</span>
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
