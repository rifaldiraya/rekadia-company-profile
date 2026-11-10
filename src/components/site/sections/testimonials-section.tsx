import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionLabel } from "@/components/site/ui/section-label";
import { TestimonialCarousel } from "@/components/site/ui/testimonial-carousel";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/content/home";
import type { Testimonial } from "@/types/content";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex w-full shrink-0 flex-col rounded-lg bg-white px-[60px] py-12 max-md:w-[350px] max-sm:w-[200px] max-sm:px-[10%]">
      <span
        aria-hidden="true"
        className="absolute top-[-3px] left-1/2 flex size-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
      >
        <Quote size={18} className="rotate-180 fill-brand text-brand" />
      </span>
      <blockquote className="text-justify font-montserrat text-base text-quote">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-8 flex gap-5">
        <Image
          src={testimonial.avatar.src}
          width={testimonial.avatar.width}
          height={testimonial.avatar.height}
          alt={testimonial.avatar.alt}
          className="size-10 shrink-0 rounded-full"
        />
        <div className="font-montserrat">
          <p className="font-bold">{testimonial.name}</p>
          <p className="text-quote">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

interface TestimonialsSectionProps {
  label?: string;
  title?: string;
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  label = TESTIMONIALS_SECTION.label,
  title = TESTIMONIALS_SECTION.title,
  testimonials = TESTIMONIALS,
}: TestimonialsSectionProps) {
  return (
    <section aria-labelledby="testimonials-heading" className="mt-[60px] bg-surface pt-9 pb-16">
      <div className="flex flex-col gap-3 px-[10%] max-lg:items-center lg:w-1/2">
        <SectionLabel className="mb-3">{label}</SectionLabel>
        <h2
          id="testimonials-heading"
          className="font-montserrat text-[32px] leading-none font-medium max-lg:text-center max-sm:text-2xl"
        >
          {title}
        </h2>
      </div>
      <div className="mt-6">
        <TestimonialCarousel
          label="Customer testimonials"
          slides={testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        />
      </div>
    </section>
  );
}
