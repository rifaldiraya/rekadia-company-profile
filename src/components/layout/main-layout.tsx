"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DRAWER_WIDTH } from "@/constants";
import MainLayoutDrawer from "@/components/layout/main-layout-drawer";
import MainLayoutSignOutModal from "@/components/layout/main-layout-sign-out-modal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MainLayoutDrawer drawerToggle={drawerToggle} isOpen={mobileOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: "100vh",
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          }}
        >
          {children}
        </Box>
      </Box>
      <MainLayoutSignOutModal />
    </>
  );
}
