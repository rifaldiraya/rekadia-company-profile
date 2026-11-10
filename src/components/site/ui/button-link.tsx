import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "gradient";

const VARIANTS: Record<Variant, string> = {
  primary:
    "h-9 rounded border border-brand bg-brand px-[14px] text-xs leading-9 font-bold tracking-[2px] text-white hover:bg-brand/90",
  ghost: "h-9 rounded bg-white px-[14px] text-xs leading-9 font-bold tracking-[2px] text-body hover:text-brand",
  gradient:
    "btn-gradient rounded px-[15px] py-[9px] font-montserrat text-base leading-5 font-semibold text-white hover:brightness-110",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
}

export function ButtonLink({ href, children, variant = "gradient", withArrow = true, className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn("inline-block transition-all duration-200", VARIANTS[variant], className)}
    >
      {children}
      {withArrow && (
        <>
          {" "}
          <span aria-hidden="true">→</span>
        </>
      )}
    </Link>
  );
}
