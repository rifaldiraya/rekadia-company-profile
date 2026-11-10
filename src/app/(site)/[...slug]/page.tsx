import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/site/ui/button-link";
import { PageBanner } from "@/components/site/sections/page-banner";
import { findPendingPage, LIVE_SITE_URL, PENDING_PAGES } from "@/content/pending-pages";
import { ROUTES } from "@/content/site";

interface PendingPageProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PENDING_PAGES.map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: PendingPageProps): Promise<Metadata> {
  const page = findPendingPage((await params).slug);
  return page ? { title: page.title, robots: { index: false } } : {};
}

export default async function PendingPage({ params }: PendingPageProps) {
  const page = findPendingPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <PageBanner title={page.title} />
      <section className="mx-[10%] my-20 flex flex-col items-center gap-6 text-center">
        <p className="max-w-xl font-montserrat text-base text-body">
          This page has not been migrated to the new website yet. You can view the current version on the live
          Rekadia website.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href={`${LIVE_SITE_URL}${page.path}`}>View on rekadia.co.id</ButtonLink>
          <ButtonLink href={ROUTES.home} variant="ghost" withArrow={false}>
            Back to Home
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
