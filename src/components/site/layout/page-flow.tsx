import type { ReactNode } from "react";

/** Stacks sections like Webflow's flex-column body, where adjacent vertical margins never collapse. */
export function PageFlow({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}
