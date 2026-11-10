import { useSession } from "next-auth/react";
import MainLayoutDrawerAccount from "@/components/layout/main-layout-drawer-account";
import MainLayoutDrawerBrand from "@/components/layout/main-layout-drawer-brand";
import MainLayoutDrawerMenu from "@/components/layout/main-layout-drawer-menu";
import { mainMenuConfig, secondMenuConfig } from "@/config/menu.config";
import { DRAWER_WIDTH } from "@/constants";
import { Box, Divider, Drawer, Stack, Toolbar } from "@mui/material";

interface MainLayoutDrawerProps {
  isOpen: boolean;
  drawerToggle: () => any;
}

export default function MainLayoutDrawer({
  isOpen,
  drawerToggle,
}: MainLayoutDrawerProps) {
  const session = useSession();

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={drawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            overflow: "initial",
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            px: 1,
          },
        }}
      >
        <Toolbar /> {/* TODO: fix mobile drawer */}
        <MainLayoutDrawerMenu level={0} menuConfig={mainMenuConfig} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            overflow: "initial",
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            px: 1,
          },
        }}
        open
      >
        <MainLayoutDrawerBrand />
        <Box sx={{ flex: 1 }} overflow="auto">
          <MainLayoutDrawerMenu level={0} menuConfig={mainMenuConfig} />
        </Box>
        <Divider />
        <Stack>
          <Box py={1}>
            <MainLayoutDrawerMenu level={0} menuConfig={secondMenuConfig} />
          </Box>
          {session && (
            <MainLayoutDrawerAccount
              username={session.data?.user.username ?? ""}
              name={session.data?.user?.name ?? ""}
              email={session.data?.user?.email ?? ""}
            />
          )}
        </Stack>
      </Drawer>
    </Box>
  );
}
