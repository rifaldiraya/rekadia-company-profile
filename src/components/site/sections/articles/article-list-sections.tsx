import Link from "next/link";
import { BlogPostCard, CaseStudyListCard } from "@/components/site/sections/articles/article-cards";
import { SearchableCardList } from "@/components/site/sections/articles/searchable-card-list";
import { SectionLabel } from "@/components/site/ui/section-label";
import { BLOG_PAGE, BLOG_POSTS, CASE_STUDIES, CASE_STUDY_PAGE } from "@/content/articles";
import { ROUTES } from "@/content/site";

export const BLOG_PAGE_COUNT = Math.ceil(BLOG_POSTS.length / BLOG_PAGE.postsPerPage);

export const blogPageHref = (page: number) => (page === 1 ? ROUTES.blog : `${ROUTES.blog}/?page=${page}`);

export function BlogListSection({ page }: { page: number }) {
  const start = (page - 1) * BLOG_PAGE.postsPerPage;
  const posts = BLOG_POSTS.slice(start, start + BLOG_PAGE.postsPerPage);

  return (
    <section aria-labelledby="blog-heading" className="mx-[10%] my-[60px] font-montserrat">
      <SearchableCardList
        header={
          <>
            <SectionLabel className="mb-3">{BLOG_PAGE.label}</SectionLabel>
            <h2
              id="blog-heading"
              className="text-center text-[32px] leading-[100%] font-semibold text-ink max-sm:text-2xl"
            >
              {BLOG_PAGE.heading}
            </h2>
          </>
        }
        placeholder={BLOG_PAGE.searchPlaceholder}
        searchLabel="Search blog posts by title"
        listClassName="grid-cols-[1fr_1fr_1fr] max-lg:grid-cols-[1fr_1fr] max-md:grid-cols-[1fr]"
        cards={posts.map((post) => ({
          key: post.href,
          title: post.title,
          card: <BlogPostCard post={post} cover={BLOG_PAGE.cover} />,
        }))}
        footer={<BlogPagination page={page} />}
      />
    </section>
  );
}

function BlogPagination({ page }: { page: number }) {
  return (
    <nav aria-label="Blog pages" className="mt-6 flex items-center justify-between">
      <p className="text-center text-body">
        <span className="sr-only">
          Page {page} of {BLOG_PAGE_COUNT}
        </span>
        <span aria-hidden="true">
          {page} / {BLOG_PAGE_COUNT}
        </span>
      </p>
      <div className="flex items-center justify-center gap-4">
        {page > 1 && <PaginationLink href={blogPageHref(page - 1)} direction="previous" />}
        {page < BLOG_PAGE_COUNT && <PaginationLink href={blogPageHref(page + 1)} direction="next" />}
      </div>
    </nav>
  );
}

function PaginationLink({ href, direction }: { href: string; direction: "previous" | "next" }) {
  return (
    <Link
      href={href}
      aria-label={direction === "previous" ? "Previous page" : "Next page"}
      className="flex size-8 items-center justify-center rounded-full bg-[#ecececa6] p-1.5 text-[#126278]"
    >
      <svg aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" className="size-4 translate-y-px">
        <path fillRule="evenodd" d={direction === "previous" ? "M8 10L4 6l4-4" : "M4 2l4 4-4 4"} />
      </svg>
    </Link>
  );
}

export function CaseStudyListSection() {
  return (
    <section aria-labelledby="case-study-heading" className="mx-[10%] my-[60px] font-montserrat">
      <SearchableCardList
        header={
          <>
            <SectionLabel className="mb-3">{CASE_STUDY_PAGE.label}</SectionLabel>
            <h2
              id="case-study-heading"
              className="w-1/2 text-center text-[36px] leading-[100%] font-semibold text-ink max-sm:w-full max-sm:text-2xl"
            >
              {CASE_STUDY_PAGE.heading}
            </h2>
          </>
        }
        placeholder={CASE_STUDY_PAGE.searchPlaceholder}
        searchLabel="Search case studies by title"
        listClassName="grid-cols-[1fr_1fr_1fr] max-md:grid-cols-[1fr]"
        cards={CASE_STUDIES.map((study) => ({
          key: study.href,
          title: study.title,
          card: <CaseStudyListCard study={study} />,
        }))}
        footer={<div aria-hidden="true" className="mt-6" />}
      />
    </section>
  );
}
