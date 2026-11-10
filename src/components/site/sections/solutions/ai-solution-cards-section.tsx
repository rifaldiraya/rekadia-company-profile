import Image from "next/image";
import { SectionLabel } from "@/components/site/ui/section-label";
import { AI_SOLUTION_CARDS, AI_SOLUTIONS_INTRO } from "@/content/solutions";

export function AiSolutionCardsSection() {
  return (
    <section aria-labelledby="ai-solutions-heading" className="mx-[10%] mt-[60px]">
      <div className="flex flex-col gap-3 max-lg:text-center max-md:items-center lg:w-[70%]">
        <SectionLabel className="mb-3 max-lg:justify-center">{AI_SOLUTIONS_INTRO.label}</SectionLabel>
        <h2
          id="ai-solutions-heading"
          className="font-montserrat text-[32px] leading-none font-semibold text-ink max-sm:text-2xl"
        >
          {AI_SOLUTIONS_INTRO.title}
        </h2>
        <p className="font-montserrat text-base leading-none text-body">{AI_SOLUTIONS_INTRO.description}</p>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AI_SOLUTION_CARDS.map((card) => (
          <li
            key={card.title}
            className="relative isolate flex flex-col gap-3 overflow-hidden px-5 pt-24 pb-4 font-montserrat text-surface motion-safe:animate-rise-in"
          >
            <Image
              src={card.image.src}
              alt={card.image.alt}
              fill
              sizes="(min-width: 992px) 27vw, (min-width: 480px) 40vw, 80vw"
              className="-z-10 object-cover"
            />
            <h3 className="text-xl leading-none font-bold whitespace-pre-line">{card.title}</h3>
            <p className="text-base">{card.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
