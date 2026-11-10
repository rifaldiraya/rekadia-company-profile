import { cn } from "@/lib/cn";

export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("flex items-center gap-1.5 font-montserrat text-base font-semibold text-ink", className)}>
      <span aria-hidden="true" className="flex size-5 items-center justify-center">
        <span className="size-[7px] rounded-full bg-brand-light" />
      </span>
      {children}
    </p>
  );
}
