import Link from "next/link";
import { SectionLabel } from "@/components/site/ui/section-label";
import { cn } from "@/lib/cn";
import type { SolutionGroup } from "@/types/content";
import { SolutionImageCard } from "./solution-image-card";

interface SolutionGroupSectionProps {
  group: SolutionGroup;
  columns?: 3 | 4;
  className?: string;
}

export function SolutionGroupSection({ group, columns = 4, className }: SolutionGroupSectionProps) {
  const headingId = `${group.id}-heading`;
  const intro = (
    <>
      <SectionLabel className="mb-3 max-lg:justify-center">{group.label}</SectionLabel>
      <h2
        id={headingId}
        className="font-montserrat text-[32px] leading-5 font-semibold text-ink max-lg:leading-none max-sm:text-2xl"
      >
        {group.title}
      </h2>
    </>
  );

  return (
    <section aria-labelledby={headingId} className={cn("mx-[10%]", className)}>
      {group.link ? (
        <div className="grid gap-6 max-lg:justify-items-center lg:grid-cols-2">
          <div className="flex flex-col gap-6 max-lg:items-center max-sm:items-stretch max-sm:text-center">
            {intro}
            <p className="font-montserrat text-base leading-none text-body max-lg:text-center">{group.description}</p>
          </div>
          <div className="flex items-end justify-end">
            <Link
              href={group.link.href}
              className="font-montserrat text-base text-body transition-colors hover:text-brand"
            >
              {group.link.label} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-lg:text-center lg:w-[70%]">
          {intro}
          <p className="font-montserrat text-base text-body">{group.description}</p>
        </div>
      )}

      <ul
        className={cn(
          "mt-9 grid gap-4",
          columns === 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-3",
        )}
      >
        {group.cards.map((card) => (
          <SolutionImageCard
            key={card.title}
            card={card}
            sizes={columns === 4 ? "(min-width: 992px) 20vw, (min-width: 480px) 40vw, 80vw" : "(min-width: 768px) 27vw, 80vw"}
          />
        ))}
      </ul>
    </section>
  );
}
