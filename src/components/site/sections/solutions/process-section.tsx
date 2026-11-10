import Image from "next/image";
import { SectionLabel } from "@/components/site/ui/section-label";
import { PROCESS_INTRO, PROCESS_STEPS } from "@/content/solutions";

export function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="mx-[10%] mt-[60px]">
      <div className="flex flex-col gap-6 max-sm:items-center">
        <SectionLabel className="mb-3 max-lg:justify-center">{PROCESS_INTRO.label}</SectionLabel>
        <h2
          id="process-heading"
          className="font-montserrat text-[32px] font-semibold text-ink max-lg:text-center max-sm:text-2xl max-sm:leading-none"
        >
          {PROCESS_INTRO.title}
        </h2>
      </div>

      <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step) => (
          <li key={step.title} className="flex flex-col items-center transition-shadow hover:shadow-nav">
            <Image
              src={step.image.src}
              width={step.image.width}
              height={step.image.height}
              alt={step.image.alt}
              sizes="250px"
              className="size-[250px]"
            />
            <p className="font-montserrat text-base font-semibold text-ink">{step.title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
