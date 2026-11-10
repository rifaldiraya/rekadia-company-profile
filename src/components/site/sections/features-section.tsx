import Image from "next/image";
import { FEATURES } from "@/content/home";

export function FeaturesSection() {
  return (
    <section aria-label="Why Rekadia" className="mx-[10%] mt-[60px]">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="flex flex-col justify-around gap-6 rounded-lg bg-surface p-3 motion-safe:animate-rise-in sm:h-[355px] 2xl:h-auto"
          >
            <Image
              src={feature.image.src}
              width={feature.image.width}
              height={feature.image.height}
              alt={feature.image.alt}
              sizes="(min-width: 992px) 20vw, (min-width: 480px) 40vw, 80vw"
              className="h-auto w-full"
            />
            <div className="flex flex-col gap-1.5 font-montserrat max-sm:text-center">
              <p className="text-base font-semibold text-ink">{feature.title}</p>
              <p className="text-sm text-body">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
