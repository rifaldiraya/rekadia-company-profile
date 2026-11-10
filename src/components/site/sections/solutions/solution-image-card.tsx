import Image from "next/image";
import type { SolutionCard } from "@/types/content";

export function SolutionImageCard({ card, sizes }: { card: SolutionCard; sizes: string }) {
  return (
    <li className="relative isolate overflow-hidden px-5 pt-[200px] pb-4">
      <Image src={card.image.src} alt={card.image.alt} fill sizes={sizes} className="-z-10 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/64" />
      <div className="relative flex flex-col gap-3 font-montserrat text-surface motion-safe:scroll-fade-in-30">
        <h3 className="text-xl leading-none font-bold whitespace-pre-line">{card.title}</h3>
        <p className="text-base">{card.description}</p>
      </div>
    </li>
  );
}
