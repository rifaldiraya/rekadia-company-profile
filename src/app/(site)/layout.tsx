import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/layout/site-footer";
import { SiteHeader } from "@/components/site/layout/site-header";
import { WhatsappButton } from "@/components/site/layout/whatsapp-button";
import { IMAGES } from "@/content/images";
import { COMPANY, SEO, SITE_URL } from "@/content/site";
import "./site.css";

// Self-hosted from @fontsource so builds do not depend on reaching Google Fonts.
const montserrat = localFont({
  src: [
    { path: "../../../node_modules/@fontsource/montserrat/files/montserrat-latin-300-normal.woff2", weight: "300" },
    { path: "../../../node_modules/@fontsource/montserrat/files/montserrat-latin-400-normal.woff2", weight: "400" },
    { path: "../../../node_modules/@fontsource/montserrat/files/montserrat-latin-500-normal.woff2", weight: "500" },
    { path: "../../../node_modules/@fontsource/montserrat/files/montserrat-latin-600-normal.woff2", weight: "600" },
    {
      path: "../../../node_modules/@fontsource/montserrat/files/montserrat-latin-600-italic.woff2",
      weight: "600",
      style: "italic",
    },
    { path: "../../../node_modules/@fontsource/montserrat/files/montserrat-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--next-font-montserrat",
  display: "swap",
});

const quicksand = localFont({
  src: [
    { path: "../../../node_modules/@fontsource/quicksand/files/quicksand-latin-400-normal.woff2", weight: "400" },
    { path: "../../../node_modules/@fontsource/quicksand/files/quicksand-latin-500-normal.woff2", weight: "500" },
    { path: "../../../node_modules/@fontsource/quicksand/files/quicksand-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--next-font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO.title, template: `%s | ${COMPANY.brand}` },
  description: SEO.description,
  applicationName: COMPANY.brand,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: COMPANY.brand,
    title: SEO.title,
    description: SEO.description,
    url: "/",
    locale: "en_US",
    images: [{ url: IMAGES.ogImage.src, width: IMAGES.ogImage.width, height: IMAGES.ogImage.height }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [IMAGES.ogImage.src],
  },
};

export const viewport: Viewport = {
  themeColor: "#25c1da",
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${quicksand.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only z-[100] rounded bg-white px-4 py-2 font-bold text-brand shadow-nav focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <WhatsappButton />
      </body>
    </html>
  );
}
