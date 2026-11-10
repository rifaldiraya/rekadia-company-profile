import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/site/ui/section-label";
import { Slider } from "@/components/site/ui/slider";
import { AI_SECTION, AI_SOLUTIONS } from "@/content/home";

export function AiSolutionsSection() {
  return (
    <section aria-labelledby="ai-solutions-heading" className="mt-[60px] bg-surface px-[10%] py-8">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <SectionLabel className="mb-3 max-lg:justify-center">{AI_SECTION.label}</SectionLabel>
          <h2
            id="ai-solutions-heading"
            className="font-montserrat text-[32px] leading-none font-semibold text-ink max-md:text-center max-sm:text-2xl"
          >
            {AI_SECTION.title}
          </h2>
          <p className="font-montserrat text-base text-body max-md:text-center">{AI_SECTION.description}</p>
        </div>
        <div className="flex items-end justify-end max-md:justify-center">
          <Link
            href={AI_SECTION.cta.href}
            className="font-montserrat font-medium text-ink transition-colors hover:text-brand max-md:w-full max-md:text-center"
          >
            {AI_SECTION.cta.label} <strong className="text-body">→</strong>
          </Link>
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-3 gap-1.5 max-sm:hidden lg:grid-cols-5">
        {AI_SOLUTIONS.map((solution) => (
          <li
            key={solution.title}
            className="group relative isolate flex h-[400px] flex-col justify-end gap-3 overflow-hidden p-5 font-montserrat text-xl font-bold text-surface"
          >
            <Image
              src={solution.background.src}
              alt=""
              fill
              sizes="(min-width: 992px) 18vw, 30vw"
              className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex-1" />
            <div className="flex flex-1 flex-col gap-3">
              <h3>{solution.title}</h3>
              <p className="text-base font-normal">{solution.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Slider
        label="AI solutions"
        autoplayMs={4000}
        arrows="light"
        nav="dots"
        className="mt-12 bg-[#ddd] sm:hidden"
        slides={AI_SOLUTIONS.map((solution) => (
          <Image
            key={solution.title}
            src={solution.mobileSlide.src}
            width={solution.mobileSlide.width}
            height={solution.mobileSlide.height}
            alt={`${solution.title}: ${solution.description}`}
            sizes="80vw"
            className="h-auto w-full motion-safe:scroll-fade-in-20"
          />
        ))}
      />
    </section>
  );
}
