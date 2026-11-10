import { useSession } from "next-auth/react";
import { OpenInNewRounded } from "@mui/icons-material";
import MainLayoutDrawerAccount from "@/components/layout/main-layout-drawer-account";
import MainLayoutDrawerBrand from "@/components/layout/main-layout-drawer-brand";
import MainLayoutDrawerMenu from "@/components/layout/main-layout-drawer-menu";
import { mainMenuConfig, secondMenuConfig } from "@/config/menu.config";
import { DRAWER_WIDTH } from "@/constants";
import { Box, Drawer, Link, Stack, Typography } from "@mui/material";

interface MainLayoutDrawerProps {
  isOpen: boolean;
  drawerToggle: () => any;
}

const paperSx = {
  overflow: "hidden",
  boxSizing: "border-box",
  width: DRAWER_WIDTH,
  border: "none",
  color: "white",
  background: "linear-gradient(180deg, #063646 0%, #064f5c 55%, #006876 100%)",
} as const;

function SectionLabel({ children }: { children: string }) {
  return (
    <Typography
      sx={{ px: 1.5, pb: 1, fontSize: 11, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(196,243,255,.6)" }}
    >
      {children}
    </Typography>
  );
}

function DrawerContent() {
  const session = useSession();

  return (
    <Stack sx={{ position: "relative", height: "100%" }}>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(180deg, black, transparent 60%)",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          right: -140,
          bottom: 80,
          borderRadius: "50%",
          background: "rgba(37,193,218,.22)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <MainLayoutDrawerBrand />

      <Box sx={{ position: "relative", flex: 1, overflow: "auto", px: 2 }}>
        <SectionLabel>Workspace</SectionLabel>
        <MainLayoutDrawerMenu level={0} menuConfig={mainMenuConfig} />
        <Box sx={{ mt: 3 }}>
          <MainLayoutDrawerMenu level={0} menuConfig={secondMenuConfig} />
        </Box>
      </Box>

      <Stack spacing={1.5} sx={{ position: "relative", p: 2 }}>
        <Link
          href="/"
          target="_blank"
          rel="noopener"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.5,
            py: 1.25,
            borderRadius: 2.5,
            fontSize: 14,
            fontWeight: 600,
            color: "white",
            border: "1px dashed rgba(196,243,255,.35)",
            transition: "background-color 200ms ease, border-color 200ms ease",
            "&:hover": { bgcolor: "rgba(255,255,255,.08)", borderColor: "#25c1da" },
          }}
        >
          View website
          <OpenInNewRounded sx={{ fontSize: 18, color: "#25c1da" }} />
        </Link>
        {session.data && (
          <MainLayoutDrawerAccount
            username={session.data.user.username ?? ""}
            name={session.data.user.name ?? ""}
            email={session.data.user.email ?? ""}
            role={session.data.user.roles?.[0] ?? ""}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default function MainLayoutDrawer({
  isOpen,
  drawerToggle,
}: MainLayoutDrawerProps) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      aria-label="CMS navigation"
    >
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={drawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": paperSx }}
      >
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": paperSx }}
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
}
