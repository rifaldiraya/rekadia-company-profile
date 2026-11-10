import { SectionLabel } from "@/components/site/ui/section-label";
import type { ProductFaq } from "@/content/products";
import { cn } from "@/lib/cn";
import { FaqChevron } from "./product-icons";

interface FaqSectionProps {
  faq: ProductFaq;
  /** The E-Office and E-Office Email pages space their FAQ headers differently. */
  layout: "e-office" | "email";
}

export function FaqSection({ faq, layout }: FaqSectionProps) {
  const isEmail = layout === "email";
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className={cn(isEmail ? "mx-[10%] mt-[60px]" : "my-[52px] flex flex-col gap-8 px-[10%]")}
    >
      <div
        className={cn(
          isEmail && "mb-8 flex w-1/2 flex-col gap-3 max-lg:w-full max-lg:items-center 2xl:mb-9",
        )}
      >
        <SectionLabel className="mb-3 max-lg:justify-center">{faq.label}</SectionLabel>
        <h2
          id="faq-heading"
          className={cn(
            "font-montserrat text-[32px] leading-none font-medium max-sm:text-2xl",
            isEmail ? "text-[#333] max-sm:text-center" : "mt-5 mb-2.5 w-full text-black max-lg:text-center",
          )}
        >
          {faq.title}
        </h2>
      </div>

      <div className="flex flex-col gap-6 rounded-[25px] border border-[#ade9f4] bg-[#f7feff] p-8 max-lg:p-6">
        {faq.items.map((item) => (
          <details key={item.question} className="group border-b border-line-soft pb-1.5">
            <summary className="flex cursor-pointer list-none items-center justify-between max-md:flex-wrap max-md:gap-4 max-sm:flex-nowrap [&::-webkit-details-marker]:hidden">
              <h3 className="max-w-[90%] font-montserrat text-base leading-[1.1] font-semibold text-ink max-md:max-w-[80%] max-sm:max-w-[206px]">
                {item.question}
              </h3>
              <FaqChevron className="transition-transform duration-200 ease-linear group-open:rotate-[88deg]" />
            </summary>
            <div className="pt-2.5 pr-10">
              <p className="text-justify font-montserrat text-base text-body">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
