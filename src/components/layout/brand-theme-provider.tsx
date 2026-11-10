"use client";

import type { ReactNode } from "react";
import { ThemeProvider, createTheme, type Theme } from "@mui/material";
import { montserrat } from "@/config/brand-font";

export const BRAND_FONT_FAMILY = `${montserrat.style.fontFamily}, sans-serif`;

const withBrandFont = (outer: Theme) => createTheme(outer, { typography: { fontFamily: BRAND_FONT_FAMILY } });

export default function BrandThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={withBrandFont}>{children}</ThemeProvider>;
}
