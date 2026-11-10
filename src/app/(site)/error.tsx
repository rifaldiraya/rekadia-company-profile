"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/content/site";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-[10%] flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="font-montserrat text-[32px] leading-none font-semibold text-ink">Something went wrong</h1>
      <p className="font-montserrat text-base text-body">We couldn&apos;t load this page. Please try again.</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="btn-gradient cursor-pointer rounded px-[15px] py-[9px] font-montserrat text-base font-semibold text-white"
        >
          Try again
        </button>
        <Link href={ROUTES.home} className="px-[15px] py-[9px] font-montserrat text-base font-semibold text-body hover:text-brand">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
