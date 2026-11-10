"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { isNavDropdown, type NavItem } from "@/types/content";
import { isActivePath, isDropdownActive } from "./nav-utils";

interface MobileNavigationProps {
  id: string;
  items: NavItem[];
  pathname: string;
  open: boolean;
  openDropdown: string | null;
  onToggleDropdown: (label: string) => void;
}

const itemClass = (active: boolean) =>
  cn("block py-2.5 font-montserrat text-sm leading-5 transition-colors hover:text-brand", active ? "text-brand" : "text-nav");

export function MobileNavigation({ id, items, pathname, open, openDropdown, onToggleDropdown }: MobileNavigationProps) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "absolute inset-x-0 top-full grid bg-white transition-[grid-template-rows,box-shadow] duration-400 ease-in-out lg:hidden",
        open ? "grid-rows-[1fr] shadow-nav" : "grid-rows-[0fr]",
      )}
    >
      <nav aria-label="Mobile" className="overflow-hidden">
        <ul className="flex flex-col items-center text-center">
          {items.map((item) => {
            if (!isNavDropdown(item)) {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.label} className="w-full">
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={itemClass(active)}>
                    {item.label}
                  </Link>
                </li>
              );
            }

            const expanded = openDropdown === item.label;
            const listId = `${id}-${item.label.toLowerCase()}`;
            return (
              <li key={item.label} className="w-full">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={listId}
                  onClick={() => onToggleDropdown(item.label)}
                  className={cn(itemClass(isDropdownActive(pathname, item)), "mx-auto flex cursor-pointer items-center gap-1.5")}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    size={14}
                    strokeWidth={2.5}
                    className={cn("transition-transform duration-200", expanded && "rotate-180")}
                  />
                </button>
                <ul id={listId} hidden={!expanded}>
                  {item.children.map((child) => {
                    const active = isActivePath(pathname, child.href);
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "block py-2.5 text-sm transition-colors hover:bg-[#f5f5f5] hover:text-brand",
                            active ? "text-brand" : "text-[#222]",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
