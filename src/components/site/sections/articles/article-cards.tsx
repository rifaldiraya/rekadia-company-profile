import Image from "next/image";
import type { BlogPost, CaseStudyCard } from "@/content/articles";
import type { ImageAsset } from "@/types/content";

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const CARD_IMAGE_SIZES = "(max-width: 767px) 80vw, (max-width: 991px) 38vw, 25vw";

function SeeDetailsLink({ href, title }: { href: string; title: string }) {
  return (
    <a href={href} className="text-xs font-medium text-body">
      See Details <strong>→</strong>
      <span className="sr-only">: {title}</span>
    </a>
  );
}

function CategoryTag({ children }: { children: string }) {
  return (
    <p className="w-fit rounded border border-[#126278] px-2 py-0.5 text-[10px] font-semibold text-[#126278] capitalize">
      {children}
    </p>
  );
}

export function BlogPostCard({ post, cover }: { post: BlogPost; cover: ImageAsset }) {
  return (
    <article className="flex w-full flex-col justify-between gap-3 rounded-lg border border-muted p-5 font-montserrat">
      <div className="flex flex-col gap-3">
        <Image
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={cover.alt}
          sizes={CARD_IMAGE_SIZES}
          className="h-auto w-full rounded-lg hover:rotate-2 hover:border-2 hover:border-[gray]"
        />
        <div className="flex items-center justify-between gap-4">
          <CategoryTag>{post.category}</CategoryTag>
          <time dateTime={post.date} className="text-right text-xs text-ink">
            {DATE_FORMAT.format(new Date(post.date))}
          </time>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-ink">{post.title}</h3>
          <p className="text-muted">{post.summary}</p>
        </div>
      </div>
      <SeeDetailsLink href={post.href} title={post.title} />
    </article>
  );
}

export function CaseStudyListCard({ study }: { study: CaseStudyCard }) {
  return (
    <article className="flex w-full flex-col justify-between gap-3 rounded-lg border border-muted p-5 font-montserrat">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Image
            src={study.logo.src}
            width={study.logo.width}
            height={study.logo.height}
            alt={study.logo.alt}
            className="h-auto max-h-5 w-1/5 max-lg:w-[30%]"
          />
          <CategoryTag>{study.category}</CategoryTag>
        </div>
        <Image
          src={study.image.src}
          width={study.image.width}
          height={study.image.height}
          alt={study.image.alt}
          sizes={CARD_IMAGE_SIZES}
          className="h-auto w-full rounded-lg hover:rotate-2 hover:border-[3px] hover:border-[#b9b2b2]"
        />
        <h3 className="text-base font-semibold text-ink">{study.title}</h3>
        <p className="text-base text-muted">{study.summary}</p>
      </div>
      <SeeDetailsLink href={study.href} title={study.title} />
    </article>
  );
}
