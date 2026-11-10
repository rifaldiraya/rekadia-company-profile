import MainLayoutAppBarAccount from "@/components/layout/main-layout-appbar-account";
import { DRAWER_WIDTH } from "@/constants";
import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

interface MainLayoutAppBarProps {
  drawerToggle: () => any;
}

export default function MainLayoutAppBar({
  drawerToggle,
}: MainLayoutAppBarProps) {
  return (
    <AppBar
      color="inherit"
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
        boxShadow: "none",
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={drawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
        </Box>
        <Box>
          <MainLayoutAppBarAccount />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
