import Image from "next/image";
import { BrainCircuit, BriefcaseBusiness, Handshake, Heart, UsersRound, WandSparkles, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/site/ui/section-label";
import { Slider } from "@/components/site/ui/slider";
import { ABOUT_INTRO, ABOUT_PHILOSOPHY, ABOUT_VISION_MISSION, type AboutIcon } from "@/content/about";

const ABOUT_ICONS: Record<AboutIcon, LucideIcon> = {
  vision: Heart,
  mission: UsersRound,
  "make-it-works": WandSparkles,
  "ai-driven": BrainCircuit,
  professional: BriefcaseBusiness,
  approachable: Handshake,
};

export function AboutIntroSection() {
  return (
    <section aria-labelledby="about-intro-heading" className="mx-[10%] mt-[60px] flex flex-col font-montserrat">
      <div className="flex flex-col gap-3">
        <h2
          id="about-intro-heading"
          className="text-[32px] leading-[100%] font-semibold text-ink max-lg:text-center max-lg:text-[28px] max-md:text-2xl"
        >
          {ABOUT_INTRO.heading}
        </h2>
        <p className="text-base leading-[100%] text-body max-lg:text-center">{ABOUT_INTRO.subheading}</p>
      </div>
      <div className="mt-12 grid grid-cols-[1fr_1fr] items-start gap-4 max-lg:grid-cols-[1fr]">
        <div className="flex flex-col gap-[1lh] text-base leading-[100%] text-body max-md:text-center 2xl:leading-[120%]">
          {ABOUT_INTRO.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Slider
          label="Rekadia team photos"
          autoplayMs={3000}
          nav="dots-shadow"
          className="h-[300px] rounded-lg bg-[#ddd]"
          slides={ABOUT_INTRO.photos.map((photo) => (
            <div key={photo.src} className="relative h-full overflow-hidden rounded-lg">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 991px) 80vw, 40vw"
                className="object-cover"
              />
            </div>
          ))}
        />
      </div>
    </section>
  );
}

export function AboutVisionMissionSection() {
  return (
    <section
      aria-label="Vision and mission"
      className="mx-[10%] mt-[60px] grid grid-cols-[1fr_1fr] gap-4 font-montserrat max-sm:grid-cols-[1fr]"
    >
      {ABOUT_VISION_MISSION.map((item) => {
        const Icon = ABOUT_ICONS[item.icon];
        return (
          <div key={item.title} className="flex flex-col gap-6 rounded-lg border border-muted px-8 py-6">
            <Icon aria-hidden="true" size={32} strokeWidth={1.5} className="text-brand-light motion-safe:hover:animate-jiggle" />
            <h2 className="text-xl font-bold text-ink max-lg:text-[28px] max-md:text-2xl">{item.title}</h2>
            <p className="text-base leading-[120%] text-body">{item.description}</p>
          </div>
        );
      })}
    </section>
  );
}

export function AboutPhilosophySection() {
  return (
    <section aria-labelledby="about-philosophy-heading" className="mx-[10%] my-[60px] flex flex-col gap-6 font-montserrat">
      <div className="flex flex-col items-center gap-6">
        <SectionLabel className="mb-3">{ABOUT_PHILOSOPHY.label}</SectionLabel>
        <h2
          id="about-philosophy-heading"
          className="text-[32px] font-semibold text-ink max-lg:text-center max-lg:text-[28px] max-lg:leading-[100%] max-md:text-2xl"
        >
          {ABOUT_PHILOSOPHY.heading}
        </h2>
        <p className="text-center text-base leading-[120%] text-body">{ABOUT_PHILOSOPHY.description}</p>
      </div>
      <ul className="mt-6 grid grid-cols-[1fr_1fr_1fr_1fr] gap-4 max-lg:grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
        {ABOUT_PHILOSOPHY.values.map((value) => {
          const Icon = ABOUT_ICONS[value.icon];
          return (
            <li key={value.title} className="flex flex-col gap-1.5 rounded-lg border border-muted px-3 py-5">
              <Icon
                aria-hidden="true"
                size={18}
                strokeWidth={1.75}
                className="mb-[18px] text-brand-light motion-safe:hover:animate-jiggle"
              />
              <h3 className="text-xl font-semibold text-ink">{value.title}</h3>
              <p className="text-base">{value.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
