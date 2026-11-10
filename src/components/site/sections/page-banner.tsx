import Image from "next/image";
import { IMAGES } from "@/content/images";
import type { ImageAsset } from "@/types/content";

interface PageBannerProps {
  title: string;
  description?: string;
  background?: ImageAsset;
}

export function PageBanner({ title, description, background = IMAGES.pageBanner }: PageBannerProps) {
  return (
    <section className="relative isolate flex h-[252px] flex-col items-start justify-center overflow-hidden bg-brand max-lg:items-center">
      <Image src={background.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="mx-[10%] flex flex-col gap-3 py-10 max-lg:items-center max-lg:text-center xl:py-20">
        <h1 className="mb-6 font-montserrat text-[32px] font-semibold text-white sm:text-[2rem] lg:text-[36px] xl:mb-3 xl:text-[2.2rem] xl:font-bold">
          {title}
        </h1>
        {description && (
          <p className="font-montserrat text-xl text-surface lg:w-1/2 xl:text-white">{description}</p>
        )}
      </div>
    </section>
  );
}
