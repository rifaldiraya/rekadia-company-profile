import Image from "next/image";
import { SectionLabel } from "@/components/site/ui/section-label";
import { INDUSTRIES, INDUSTRIES_PAGE } from "@/content/industries";

export function IndustriesSection() {
  return (
    <section aria-labelledby="industries-heading" className="mx-[10%] my-[60px]">
      <div className="flex flex-col items-center gap-3 font-montserrat">
        <SectionLabel className="mb-3">{INDUSTRIES_PAGE.label}</SectionLabel>
        <h2
          id="industries-heading"
          className="text-[36px] font-semibold text-ink max-sm:text-center max-sm:text-2xl max-sm:leading-[100%]"
        >
          {INDUSTRIES_PAGE.heading}
        </h2>
        <p className="text-xl text-body max-md:text-center max-sm:text-base">{INDUSTRIES_PAGE.description}</p>
      </div>
      <ul className="mt-9 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 max-lg:grid-cols-[1fr_1fr_1fr] max-md:grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
        {INDUSTRIES.map((industry) => (
          <li key={industry.title} className="relative isolate flex h-[400px] flex-col justify-end px-5 py-4">
            <Image
              src={industry.image.src}
              alt={industry.image.alt}
              fill
              sizes="(max-width: 479px) 80vw, (max-width: 767px) 40vw, (max-width: 991px) 27vw, 16vw"
              className="-z-10 object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[#000000a3]" />
            <div className="relative flex flex-col gap-3 font-montserrat text-surface">
              <h3 className="text-xl font-bold">{industry.title}</h3>
              <p className="text-base">{industry.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
