"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { isNavDropdown, type NavItem } from "@/types/content";
import { isActivePath, isDropdownActive } from "./nav-utils";

interface DesktopNavigationProps {
  items: NavItem[];
  pathname: string;
  openDropdown: string | null;
  onToggleDropdown: (label: string) => void;
}

const linkClass = (active: boolean) =>
  cn(
    "font-montserrat text-sm leading-5 font-bold transition-colors hover:text-brand",
    active ? "text-brand" : "text-nav",
  );

export function DesktopNavigation({ items, pathname, openDropdown, onToggleDropdown }: DesktopNavigationProps) {
  return (
    <ul className="hidden h-full items-center justify-between gap-7 lg:flex lg:flex-1 2xl:mx-auto 2xl:flex-none 2xl:gap-9">
      {items.map((item) => {
        if (!isNavDropdown(item)) {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.label}>
              <Link href={item.href} aria-current={active ? "page" : undefined} className={cn(linkClass(active), "py-[5px]")}>
                {item.label}
              </Link>
            </li>
          );
        }

        const open = openDropdown === item.label;
        const listId = `nav-dropdown-${item.label.toLowerCase()}`;
        return (
          <li key={item.label} className="relative h-full">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={listId}
              onClick={() => onToggleDropdown(item.label)}
              className={cn(linkClass(isDropdownActive(pathname, item)), "flex h-full cursor-pointer items-center gap-1.5")}
            >
              {item.label}
              <ChevronDown aria-hidden="true" size={14} strokeWidth={2.5} />
            </button>
            <ul
              id={listId}
              hidden={!open}
              className="absolute top-full left-0 min-w-full overflow-hidden rounded-b-[10px] bg-white shadow-nav"
            >
              {item.children.map((child) => {
                const active = isActivePath(pathname, child.href);
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block px-1.5 py-2.5 text-center text-sm whitespace-nowrap transition-colors hover:bg-[#f5f5f5] hover:text-brand",
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
  );
}
