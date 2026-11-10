import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/content/images";
import { RESULTS_STRIP } from "@/content/solutions";

export function ResultsStrip() {
  return (
    <section
      aria-labelledby="results-heading"
      className="relative isolate mt-[60px] flex flex-col items-center justify-center gap-6 overflow-hidden px-[10%] py-[34px]"
    >
      <Image src={IMAGES.ctaBackground.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <h2
        id="results-heading"
        className="text-center font-montserrat text-[32px] leading-none font-semibold text-ink max-sm:text-2xl"
      >
        {RESULTS_STRIP.title}
      </h2>
      <Link
        href={RESULTS_STRIP.cta.href}
        className="btn-gradient inline-block rounded px-[15px] py-[9px] font-montserrat text-base text-white transition-all duration-200 hover:brightness-110 max-sm:text-center"
      >
        {RESULTS_STRIP.cta.label} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
