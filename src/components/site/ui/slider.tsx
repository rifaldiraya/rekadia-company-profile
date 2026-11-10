"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type TransitionEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hook/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

const SWIPE_THRESHOLD_PX = 40;

interface SliderProps {
  label: string;
  slides: ReactNode[];
  autoplayMs?: number;
  durationMs?: number;
  arrows?: "light" | "dark" | false;
  nav?: "dots" | "dots-shadow" | "numbers" | false;
  className?: string;
}

/** Infinite slide carousel mirroring Webflow's slider (500ms ease, optional autoplay). */
export function Slider({
  label,
  slides,
  autoplayMs,
  durationMs = 500,
  arrows = false,
  nav = "dots",
  className,
}: SliderProps) {
  const count = slides.length;
  const looping = count > 1;
  const [position, setPosition] = useState(looping ? 1 : 0);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pointerStart = useRef<number | null>(null);

  const active = looping ? (position - 1 + count) % count : 0;

  const step = useCallback(
    (delta: number) => {
      if (!looping) return;
      setAnimated(true);
      setPosition((current) => Math.min(Math.max(current + delta, 0), count + 1));
    },
    [count, looping],
  );

  const goTo = (index: number) => {
    setAnimated(true);
    setPosition(index + 1);
  };

  const settle = useCallback(() => {
    if (position === 0 || position === count + 1) {
      setAnimated(false);
      setPosition(position === 0 ? count : 1);
    }
  }, [position, count]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) settle();
  };

  useEffect(() => {
    if (reducedMotion) settle();
  }, [reducedMotion, settle]);

  useEffect(() => {
    if (animated) return undefined;
    const frame = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, [animated]);

  useEffect(() => {
    if (!autoplayMs || paused || reducedMotion || !looping) return undefined;
    const timer = setTimeout(() => step(1), autoplayMs);
    return () => clearTimeout(timer);
  }, [autoplayMs, paused, reducedMotion, looping, position, step]);

  const items = looping ? [slides[count - 1], ...slides, slides[0]] : slides;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative overflow-hidden", className)}
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
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${position * 100}%)`,
          transition: animated ? `transform ${durationMs}ms ease` : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {items.map((slide, index) => {
          const isClone = looping && (index === 0 || index === items.length - 1);
          const slideIndex = looping ? (index - 1 + count) % count : index;
          const hidden = isClone || slideIndex !== active;
          return (
            <div
              key={isClone ? `clone-${index}` : `slide-${slideIndex}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${count}`}
              aria-hidden={hidden}
              inert={hidden}
              className="h-full w-full shrink-0"
            >
              {slide}
            </div>
          );
        })}
      </div>

      {arrows && looping && (
        <>
          <SliderArrow direction="previous" tone={arrows} onClick={() => step(-1)} />
          <SliderArrow direction="next" tone={arrows} onClick={() => step(1)} />
        </>
      )}

      {nav && looping && (
        <div className="absolute inset-x-0 bottom-0 z-[2] h-10 pt-2.5 text-center">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show slide ${index + 1} of ${count}`}
              aria-pressed={index === active}
              onClick={() => goTo(index)}
              className={cn(
                "mx-[3px] inline-block cursor-pointer align-top transition-colors duration-100",
                nav === "numbers"
                  ? "px-[0.5em] py-[0.2em] text-sm text-ink-strong"
                  : "size-[14px] rounded-full",
                nav === "numbers" && (index === active ? "rounded-full bg-white font-semibold" : "bg-transparent"),
                nav !== "numbers" && (index === active ? "bg-white" : "bg-white/40"),
                nav === "dots-shadow" && "shadow-[0_0_3px_#3336]",
              )}
            >
              {nav === "numbers" ? index + 1 : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SliderArrow({
  direction,
  tone,
  onClick,
}: {
  direction: "previous" | "next";
  tone: "light" | "dark";
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === "previous" ? "Previous slide" : "Next slide"}
      onClick={onClick}
      className={cn(
        "absolute inset-y-0 z-[3] flex w-20 cursor-pointer items-center justify-center",
        direction === "previous" ? "left-0" : "right-0",
        tone === "light" ? "text-white" : "text-black",
      )}
    >
      <Icon aria-hidden="true" size={tone === "light" ? 40 : 32} strokeWidth={1.5} />
    </button>
  );
}
