"use client";

import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import BrandThemeProvider, { BRAND_FONT_FAMILY } from "@/components/layout/brand-theme-provider";
import SignInForm from "@/features/sign-in/components/sign-in-form";
import SignInShowcase from "@/features/sign-in/components/sign-in-showcase";

export default function SignInPage() {
  return (
    <BrandThemeProvider>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 11fr) minmax(0, 9fr)" },
          minHeight: "100vh",
          bgcolor: "white",
          fontFamily: BRAND_FONT_FAMILY,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SignInShowcase />
        </Box>

        <Stack sx={{ minHeight: "100vh" }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            sx={{
              display: { xs: "flex", md: "none" },
              px: 3,
              py: 2,
              color: "white",
              background: "linear-gradient(90deg, #063646, #006876 60%, #00c2dc)",
            }}
          >
            <Box sx={{ bgcolor: "white", borderRadius: 1.5, p: 0.5, display: "flex" }}>
              <Image src="/logo.png" alt="" width={24} height={24} />
            </Box>
            <Typography fontWeight={700}>Rekadia CMS</Typography>
          </Stack>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", px: 3, py: { xs: 5, md: 6 } }}>
            <SignInForm />
          </Box>
        </Stack>
      </Box>
    </BrandThemeProvider>
  );
}
