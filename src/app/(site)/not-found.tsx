import { ButtonLink } from "@/components/site/ui/button-link";
import { ROUTES } from "@/content/site";

export default function SiteNotFound() {
  return (
    <section className="mx-[10%] flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="font-montserrat text-[36px] font-medium text-brand">404</p>
      <h1 className="font-montserrat text-[32px] leading-none font-semibold text-ink">Page not found</h1>
      <p className="font-montserrat text-base text-body">The page you are looking for doesn&apos;t exist or has moved.</p>
      <ButtonLink href={ROUTES.home}>Back to Home</ButtonLink>
    </section>
  );
}
