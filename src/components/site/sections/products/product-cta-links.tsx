import Link from "next/link";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/content";

interface ProductCtaLinksProps {
  whatsapp: NavLink;
  demo: NavLink;
  className?: string;
}

export function ProductCtaLinks({ whatsapp, demo, className }: ProductCtaLinksProps) {
  return (
    <div className={cn("flex gap-3 font-montserrat text-base max-sm:text-center", className)}>
      <a
        href={whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gradient rounded px-[15px] py-[9px] font-semibold text-white transition hover:brightness-110"
      >
        {whatsapp.label}
      </a>
      <Link
        href={demo.href}
        className="rounded border border-body px-[15px] py-[9px] font-medium text-body transition-colors hover:text-brand-dark"
      >
        {demo.label}
      </Link>
    </div>
  );
}
