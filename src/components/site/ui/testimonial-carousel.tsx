"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hook/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 3_000;
const SPEED_MS = 800;
const SWIPE_THRESHOLD_PX = 40;

/** Signed circular distance from the active slide, in the range [-(n-1)/2, n/2]. */
const circularOffset = (index: number, active: number, count: number) => {
  const offset = (((index - active) % count) + count) % count;
  return offset > count / 2 ? offset - count : offset;
};

interface TestimonialCarouselProps {
  label: string;
  slides: ReactNode[];
}

/**
 * Looping, centred carousel matching the original Swiper setup
 * (2 slides per view, centred, 800ms, 3s autoplay, side slides scaled to 0.6).
 */
export function TestimonialCarousel({ label, slides }: TestimonialCarouselProps) {
  const count = slides.length;
  const [{ active, direction }, setState] = useState({ active: 0, direction: 1 });
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pointerStart = useRef<number | null>(null);

  const step = useCallback(
    (delta: 1 | -1) => setState((current) => ({ active: (current.active + delta + count) % count, direction: delta })),
    [count],
  );

  useEffect(() => {
    if (paused || reducedMotion || count < 2) return undefined;
    const timer = setTimeout(() => step(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, paused, reducedMotion, count, step]);

  const offsets = slides.map((_, index) => circularOffset(index, active, count));
  const edge = direction > 0 ? Math.max(...offsets) : Math.min(...offsets);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative cursor-grab overflow-hidden pt-12 select-none active:cursor-grabbing"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const delta = event.clientX - pointerStart.current;
        pointerStart.current = null;
        if (Math.abs(delta) > SWIPE_THRESHOLD_PX) step(delta < 0 ? 1 : -1);
      }}
    >
      <div className="grid items-center">
        {slides.map((slide, index) => {
          const offset = offsets[index];
          const isActive = offset === 0;
          // The slide wrapping from one end to the other moves off-screen, so it jumps without animating.
          const wrapped = offset === edge && Math.abs(offset) > 1;
          return (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className="col-start-1 row-start-1 flex w-1/2 justify-center"
              style={{
                transform: `translateX(${50 + offset * 100}%)`,
                transition: wrapped ? "none" : `transform ${SPEED_MS}ms ease`,
              }}
            >
              <div
                className={cn(
                  "flex w-full justify-center transition-[transform,opacity] duration-800 ease-[cubic-bezier(.77,0,.175,1)]",
                  isActive ? "scale-100 opacity-100" : "scale-[0.6] opacity-25",
                )}
              >
                {slide}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => step(-1)}
        className="sr-only left-4 top-1/2 rounded-full bg-white p-2 text-ink shadow-nav focus:not-sr-only focus:absolute"
        aria-label="Previous testimonial"
      >
        <ChevronLeft aria-hidden="true" size={20} />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        className="sr-only right-4 top-1/2 rounded-full bg-white p-2 text-ink shadow-nav focus:not-sr-only focus:absolute"
        aria-label="Next testimonial"
      >
        <ChevronRight aria-hidden="true" size={20} />
      </button>
    </div>
  );
}
