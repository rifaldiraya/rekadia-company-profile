import { ROUTES } from "@/content/site";

/** The current Webflow website, where pages not yet migrated still live. */
export const LIVE_SITE_URL = "https://www.rekadia.co.id";

/** Routes linked from the navigation that are outside the current migration scope. */
export const PENDING_PAGES: { path: string; title: string }[] = [{ path: ROUTES.clients, title: "Our Clients" }];

export const findPendingPage = (segments: string[]) =>
  PENDING_PAGES.find((page) => page.path === `/${segments.join("/")}`);
