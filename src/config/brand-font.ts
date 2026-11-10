import localFont from "next/font/local";

/** The company-profile heading font, self-hosted like the public site. */
export const montserrat = localFont({
  src: [
    { path: "../../node_modules/@fontsource/montserrat/files/montserrat-latin-400-normal.woff2", weight: "400" },
    { path: "../../node_modules/@fontsource/montserrat/files/montserrat-latin-500-normal.woff2", weight: "500" },
    { path: "../../node_modules/@fontsource/montserrat/files/montserrat-latin-600-normal.woff2", weight: "600" },
    { path: "../../node_modules/@fontsource/montserrat/files/montserrat-latin-700-normal.woff2", weight: "700" },
  ],
  display: "swap",
});
