"use client";

import { useId, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SearchableCard {
  key: string;
  title: string;
  card: ReactNode;
}

interface SearchableCardListProps {
  header: ReactNode;
  placeholder: string;
  searchLabel: string;
  cards: SearchableCard[];
  listClassName: string;
  footer?: ReactNode;
}

/** Filters the rendered cards by title as the visitor types, like the live site's Finsweet CMS filter. */
export function SearchableCardList({
  header,
  placeholder,
  searchLabel,
  cards,
  listClassName,
  footer,
}: SearchableCardListProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = needle ? cards.filter((card) => card.title.toLowerCase().includes(needle)) : cards;

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {header}
        <form role="search" onSubmit={(event) => event.preventDefault()} className="mb-[15px] flex w-full justify-center">
          <div className="flex w-1/2 items-center rounded-md border border-muted px-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand max-sm:w-4/5">
            <label htmlFor={inputId} className="sr-only">
              {searchLabel}
            </label>
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              autoComplete="off"
              className="h-[38px] w-full bg-transparent text-sm leading-[1.42857] text-[#333] placeholder:text-[#999] focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
            <Search aria-hidden="true" size={12} strokeWidth={2.5} className="shrink-0 text-muted" />
          </div>
        </form>
      </div>
      <div className="mt-9">
        <ul className={cn("grid gap-4", listClassName)}>
          {visible.map((item) => (
            <li key={item.key} className="flex">
              {item.card}
            </li>
          ))}
        </ul>
        <p aria-live="polite" className="sr-only">
          {needle ? `${visible.length} result${visible.length === 1 ? "" : "s"}` : ""}
        </p>
        {footer}
      </div>
    </>
  );
}
