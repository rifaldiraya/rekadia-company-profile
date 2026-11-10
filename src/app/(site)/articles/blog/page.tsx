import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFlow } from "@/components/site/layout/page-flow";
import {
  BLOG_PAGE_COUNT,
  BlogListSection,
  blogPageHref,
} from "@/components/site/sections/articles/article-list-sections";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageBanner } from "@/components/site/sections/page-banner";
import { ARTICLES_BANNER_DESCRIPTION, BLOG_PAGE } from "@/content/articles";
import { pageMetadata } from "@/lib/page-metadata";

interface BlogPageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

/** Returns the requested page number, or null when the `page` parameter is not a page that exists. */
async function resolvePage(searchParams: BlogPageProps["searchParams"]) {
  const { page } = await searchParams;
  if (page === undefined) return 1;
  if (typeof page !== "string" || !/^\d+$/.test(page)) return null;
  const number = Number(page);
  return number >= 1 && number <= BLOG_PAGE_COUNT ? number : null;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const page = (await resolvePage(searchParams)) ?? 1;
  return pageMetadata({
    title: page === 1 ? BLOG_PAGE.metaTitle : `${BLOG_PAGE.metaTitle} · Page ${page}`,
    description: BLOG_PAGE.metaDescription,
    path: blogPageHref(page),
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = await resolvePage(searchParams);
  if (page === null) notFound();

  return (
    <PageFlow>
      <PageBanner title={BLOG_PAGE.title} description={ARTICLES_BANNER_DESCRIPTION} />
      <BlogListSection page={page} />
      <CtaSection />
    </PageFlow>
  );
}
