import Image from "next/image";
import { ButtonLink } from "@/components/site/ui/button-link";
import { SectionLabel } from "@/components/site/ui/section-label";
import { Slider } from "@/components/site/ui/slider";
import { PRODUCTS, PRODUCTS_LABEL } from "@/content/home";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/content";

function ProductSlide({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col-reverse items-center justify-center gap-[60px] max-md:pb-10 max-sm:gap-0 max-sm:px-[10%] md:flex-row md:items-stretch">
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <Image
          src={product.image.src}
          width={product.image.width}
          height={product.image.height}
          alt={product.image.alt}
          sizes="(min-width: 768px) 40vw, 80vw"
          className={cn("h-auto w-4/5", !product.narrowImage && "md:w-full")}
        />
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-3 max-sm:text-center md:items-start">
        <SectionLabel>{PRODUCTS_LABEL}</SectionLabel>
        <h2 className="font-montserrat text-base leading-[1.2] font-semibold text-ink max-sm:w-full lg:leading-5">
          <span className="text-2xl lg:text-[40px]">{product.name}</span> by Rekadia
        </h2>
        <p className="font-montserrat text-base leading-none text-body max-md:text-center">
          <span className="max-md:hidden">{product.description.en}</span>
          <span lang="id" className="md:hidden">
            {product.description.id}
          </span>
        </p>
        <ButtonLink href={product.href} className="max-sm:text-xs">
          {product.ctaLabel}
        </ButtonLink>
      </div>
    </article>
  );
}

export function ProductsSection() {
  return (
    <section aria-label="Our products" className="mx-[10%] mt-[60px] max-sm:mx-0">
      <Slider
        label="Rekadia products"
        autoplayMs={4000}
        nav="dots-shadow"
        slides={PRODUCTS.map((product) => (
          <ProductSlide key={product.name} product={product} />
        ))}
      />
    </section>
  );
}
