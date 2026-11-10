/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */

"use client";

// eslint-disable-next-line import/no-cycle
import MainLayoutDrawerMenu from "@/components/layout/main-layout-drawer-menu";
import { ActionEnum } from "@/config/access-control.config";
import { IMenuConfig } from "@/config/menu.config";
import checkAccessPermit from "@/utils/check-access-permit";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import {
  Box,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const withoutTrailingSlash = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

/** Top-level routes such as `/dashboard` match exactly; deeper routes also match their sub-pages. */
const matchesRoute = (route: string | undefined, pathname: string) =>
  !!route && (route === pathname || (route.split("/").length > 2 && pathname.startsWith(`${route}/`)));

const menuButtonSx = (isActive: boolean) => ({
  position: "relative",
  mb: 0.5,
  borderRadius: 2.5,
  p: "10px 12px",
  overflow: "hidden",
  backgroundColor: isActive ? "rgba(255,255,255,.14)" : "transparent",
  boxShadow: isActive ? "inset 0 0 0 1px rgba(255,255,255,.16)" : "none",
  transition: "background-color 200ms ease",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 10,
    bottom: 10,
    width: 3,
    borderRadius: 3,
    backgroundColor: "#25c1da",
    transform: isActive ? "scaleY(1)" : "scaleY(0)",
    transition: "transform 200ms ease",
  },
  ":hover": {
    backgroundColor: "rgba(255,255,255,.1)",
    ".MuiTypography-root, .MuiListItemIcon-root": { color: "white" },
  },
  "> .MuiSvgIcon-root": { color: "rgba(255,255,255,.75)" },
} as const);

export interface MainLayoutDrawerMenuItemProps {
  menu: IMenuConfig;
  level: number;
  permissions: {
    type: string;
    values: string[];
  }[];
  roles: string[];
}

export function MainLayoutDrawerMenuItem({
  menu,
  level,
  permissions,
  roles,
}: MainLayoutDrawerMenuItemProps) {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const pathname = withoutTrailingSlash(usePathname());

  const expandList = () => setIsExpand((prev) => !prev);
  const isSubmenu =
    menu.subMenu && Array.isArray(menu.subMenu) && !!menu.subMenu.length;

  const isActive = matchesRoute(menu.route, pathname);

  const hasChildActive = useMemo(() => {
    function hasRoute(obj: IMenuConfig) {
      if (matchesRoute(obj.route, pathname)) {
        return true;
      }

      if (obj.subMenu) {
        for (const child of obj.subMenu) {
          if (hasRoute(child as IMenuConfig)) {
            return true;
          }
        }
      }

      return false;
    }

    return hasRoute(menu);
  }, [pathname, menu]);

  const renderDropdownItem = () => (
    <ListItemButton
      onClick={expandList}
      sx={menuButtonSx(isActive)}
    >
      {!level ? (
        <ListItemIcon sx={{ minWidth: 40, color: isActive ? "#25c1da" : "rgba(255,255,255,.75)" }}>
          {menu.icon({ isActive })}
        </ListItemIcon>
      ) : level === 1 ? (
        <ListItemIcon>
          <Box
            ml={1.7}
            borderRadius="100%"
            width={5}
            height={5}
            sx={{
              backgroundColor: "rgba(255,255,255,.6)",
            }}
          />
        </ListItemIcon>
      ) : null}
      <ListItemText
        sx={{
          ".MuiTypography-root": {
            fontWeight: 600,
            pl: !level || level === 1 ? 0 : 4.5,
            fontSize: 14,
            color: isActive ? "white" : "rgba(255,255,255,.75)",
          },
        }}
        primary={menu.label ?? ""}
      />
      {isExpand ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
    </ListItemButton>
  );

  const renderLinkItem = () => (
    <ListItemButton
      onClick={expandList}
      LinkComponent={Link}
      href={menu.route!}
      sx={menuButtonSx(isActive)}
    >
      {!level ? (
        <ListItemIcon sx={{ minWidth: 40, color: isActive ? "#25c1da" : "rgba(255,255,255,.75)" }}>
          {menu.icon({ isActive })}
        </ListItemIcon>
      ) : level === 1 ? (
        <ListItemIcon>
          <Box
            ml={1.7}
            borderRadius="100%"
            width={5}
            height={5}
            sx={{
              backgroundColor: "rgba(255,255,255,.6)",
            }}
          />
        </ListItemIcon>
      ) : null}
      <ListItemText
        sx={{
          ".MuiTypography-root": {
            fontWeight: 600,
            pl: !level || level === 1 ? 0 : 4.5,
            fontSize: 14,
            color: isActive ? "white" : "rgba(255,255,255,.75)",
          },
        }}
        primary={menu.label}
      />
    </ListItemButton>
  );

  useEffect(() => {
    setIsExpand((prev) => (!prev ? hasChildActive : prev));
  }, [hasChildActive]);

  if (process.env.NODE_ENV !== "development" && menu.devOnly) {
    return null;
  }

  if (menu.moduleName) {
    if (
      !checkAccessPermit(
        menu.moduleName,
        Object.values(ActionEnum),
        permissions,
        roles,
      )
    )
      return null;
  }

  return (
    <>
      <ListItem disablePadding>
        {isSubmenu ? renderDropdownItem() : renderLinkItem()}
      </ListItem>
      {isSubmenu && (
        <Collapse in={isExpand}>
          <MainLayoutDrawerMenu
            level={level + 1}
            menuConfig={menu.subMenu! as Omit<IMenuConfig[], "icon">}
          />
        </Collapse>
      )}
    </>
  );
}
