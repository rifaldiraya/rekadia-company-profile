"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { DelvaStep } from "@/content/products";
import { cn } from "@/lib/cn";

interface DelvaWorkflowTabsProps {
  steps: DelvaStep[];
  numberClassName: string;
}

export function DelvaWorkflowTabs({ steps, numberClassName }: DelvaWorkflowTabsProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const select = (index: number) => {
    const next = (index + steps.length) % steps.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      Home: 0,
      End: steps.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  return (
    <div className="flex items-start justify-start max-sm:flex-col max-sm:items-center max-sm:justify-center">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Delva workflow steps"
        onKeyDown={onKeyDown}
        className="ml-7 flex flex-[.6] flex-col items-start justify-center gap-4 border-l border-[#c5d6d6]"
      >
        {steps.map((step, index) => {
          const selected = index === active;
          return (
            <button
              key={step.number}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                "-ml-7 flex max-w-full cursor-pointer items-center gap-3 px-3 text-left text-[#222]",
                selected
                  ? "w-full justify-start rounded-xl bg-white py-[9px] shadow-nav"
                  : "justify-center bg-[#f7f9f8]",
              )}
            >
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#c5d6d6] p-3"
              >
                <span className={cn("font-semibold", numberClassName)}>{step.number}</span>
              </span>
              <span className="font-montserrat font-semibold text-[#64767b]">{step.name}</span>
            </button>
          );
        })}
      </div>

      <div className="relative ml-16 w-full flex-1 overflow-hidden max-sm:mt-6 max-sm:ml-0 max-sm:block">
        {steps.map((step, index) => (
          <div
            key={step.number}
            role="tabpanel"
            id={`${baseId}-panel-${index}`}
            aria-labelledby={`${baseId}-tab-${index}`}
            tabIndex={0}
            hidden={index !== active}
            className="rounded-xl bg-white motion-safe:animate-[fade-in_300ms_ease_both]"
          >
            <div className="flex flex-col gap-6 p-9 shadow-[0_2px_5px_#0003,0_2px_5px_#0003]">
              <p
                aria-hidden="true"
                className="w-fit max-w-full rounded-2xl bg-[#e9f7f8] px-3 py-1.5 font-montserrat font-light text-[#016d7b]"
              >
                {step.title}
              </p>
              <h3 className="font-montserrat text-[32px] leading-[100%] font-semibold text-[#333] max-sm:text-2xl">
                {step.title}
              </h3>
              <p className="text-[#333]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
