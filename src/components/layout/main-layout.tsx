"use client";

import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { IconButton, Stack, Typography } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { DRAWER_WIDTH } from "@/constants";
import BrandThemeProvider from "@/components/layout/brand-theme-provider";
import MainLayoutDrawer from "@/components/layout/main-layout-drawer";
import MainLayoutSignOutModal from "@/components/layout/main-layout-sign-out-modal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <BrandThemeProvider>
      <Box sx={{ display: "flex", bgcolor: "#f3f7f9", minHeight: "100vh" }}>
        <MainLayoutDrawer drawerToggle={drawerToggle} isOpen={mobileOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            sx={{
              display: { xs: "flex", md: "none" },
              position: "sticky",
              top: 0,
              zIndex: (theme) => theme.zIndex.appBar,
              px: 2,
              py: 1.25,
              color: "white",
              background: "linear-gradient(90deg, #063646, #006876 60%, #00c2dc)",
            }}
          >
            <IconButton color="inherit" edge="start" aria-label="Open navigation" onClick={drawerToggle}>
              <MenuRounded />
            </IconButton>
            <Box sx={{ bgcolor: "white", borderRadius: 1.5, p: 0.5, display: "flex" }}>
              <Image src="/logo.png" alt="" width={22} height={22} />
            </Box>
            <Typography fontWeight={700}>Rekadia CMS</Typography>
          </Stack>
          <Box sx={{ p: { xs: 2, sm: 3, lg: 4 }, maxWidth: 1360, mx: "auto" }}>{children}</Box>
        </Box>
      </Box>
      <MainLayoutSignOutModal />
    </BrandThemeProvider>
  );
}
