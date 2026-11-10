import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/site/forms/newsletter-form";
import { SocialIcon } from "@/components/site/ui/social-icon";
import { NEWSLETTER } from "@/content/home";
import { IMAGES } from "@/content/images";
import { COMPANY, FOOTER_PAGES, OFFICES, ROUTES, SOCIAL_LINKS } from "@/content/site";
import type { Office } from "@/types/content";

const headingClass = "font-montserrat text-base font-medium text-brand-pale 2xl:text-lg max-sm:text-sm";
const bodyClass = "mt-2 font-montserrat text-sm leading-[18px] text-white";

function OfficeColumn({ office }: { office: Office }) {
  return (
    <div className="max-md:mb-6">
      <h3 className={headingClass}>{office.label}</h3>
      <p className={bodyClass}>{office.address}</p>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-footer px-[10%] max-sm:font-montserrat">
      <div className="flex flex-col gap-3 py-9">
        <section
          aria-labelledby="newsletter-heading"
          className="flex flex-col items-start gap-2.5 pb-[15px] md:flex-row md:items-center md:gap-6"
        >
          <h2 id="newsletter-heading" className="text-2xl leading-[1.2] font-bold text-white max-md:text-base">
            {NEWSLETTER.title}
          </h2>
          <NewsletterForm />
        </section>

        <div className="mb-6 flex flex-col md:grid md:grid-cols-3 md:gap-12 lg:grid-cols-4">
          <div className="flex flex-col gap-3 max-md:mb-6">
            <Link href={ROUTES.home} aria-label="Rekadia home" className="w-fit">
              <Image
                src={IMAGES.logoWhite.src}
                width={IMAGES.logoWhite.width}
                height={IMAGES.logoWhite.height}
                alt={IMAGES.logoWhite.alt}
                className="h-auto w-[102px]"
              />
            </Link>
            <p className="font-montserrat text-[0.8rem] font-bold text-white 2xl:text-xs 2xl:font-semibold">
              {COMPANY.legalName}
            </p>
          </div>

          <OfficeColumn office={OFFICES.headquarter} />
          <OfficeColumn office={OFFICES.administration} />

          <nav aria-labelledby="footer-pages-heading" className="flex flex-col">
            <h3 id="footer-pages-heading" className={headingClass}>
              Pages
            </h3>
            <ul>
              {FOOTER_PAGES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={`${bodyClass} inline-block underline hover:text-brand-pale`}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="w-full rounded-lg border-0 border-t border-brand-pale" />

        <div className="mt-6 flex items-center justify-between gap-3 max-lg:items-start max-sm:flex-col">
          <p className="font-montserrat text-[0.8rem] font-bold text-white 2xl:text-[10px] 2xl:font-medium">
            © {COMPANY.legalName}
          </p>
          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target={social.platform === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-brand"
                >
                  <SocialIcon platform={social.platform} size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
