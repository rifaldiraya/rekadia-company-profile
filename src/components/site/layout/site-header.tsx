"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { IMAGES } from "@/content/images";
import { MAIN_NAVIGATION, ROUTES } from "@/content/site";
import { useDismiss } from "@/hook/use-dismiss";
import { cn } from "@/lib/cn";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

const MOBILE_MENU_ID = "mobile-navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  useEffect(closeAll, [pathname, closeAll]);
  useDismiss(headerRef, menuOpen || openDropdown !== null, closeAll);

  const toggleDropdown = (label: string) => setOpenDropdown((current) => (current === label ? null : label));

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 h-[60px] border-b border-line bg-white shadow-nav"
    >
      <div className="flex h-full items-center justify-between px-[10%]">
        <Link href={ROUTES.home} aria-label="Rekadia home" className="shrink-0">
          <Image
            src={IMAGES.logo.src}
            width={IMAGES.logo.width}
            height={IMAGES.logo.height}
            alt={IMAGES.logo.alt}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* The right margin matches the original's invisible 100px language switcher, which offsets the menu. */}
        <nav aria-label="Main" className="hidden h-full lg:mr-[100px] lg:flex lg:flex-1">
          <DesktopNavigation
            items={MAIN_NAVIGATION}
            pathname={pathname}
            openDropdown={openDropdown}
            onToggleDropdown={toggleDropdown}
          />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <span aria-hidden="true" className="h-[26px] w-px bg-muted" />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen((open) => !open);
              setOpenDropdown(null);
            }}
            className={cn(
              "flex cursor-pointer items-center py-[18px] transition-colors hover:text-brand",
              menuOpen ? "text-brand" : "text-nav",
            )}
          >
            <Menu aria-hidden="true" size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <MobileNavigation
        id={MOBILE_MENU_ID}
        items={MAIN_NAVIGATION}
        pathname={pathname}
        open={menuOpen}
        openDropdown={openDropdown}
        onToggleDropdown={toggleDropdown}
      />
    </header>
  );
}
