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

  const pathname = usePathname();

  const expandList = () => setIsExpand((prev) => !prev);
  const isSubmenu =
    menu.subMenu && Array.isArray(menu.subMenu) && !!menu.subMenu.length;

  const isActive = menu.route === pathname;

  const hasChildActive = useMemo(() => {
    function hasRoute(obj: IMenuConfig) {
      if (obj.route === pathname) {
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
      sx={{
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        p: "8px 12px",
        backgroundColor: ({ color }) => isActive ? color.accent[400] : "transparent",
        ":hover": {
          backgroundColor: ({ color }) => color.accent[400],
          '.MuiTypography-root': {
            color: 'white'
          }
        }
      }}
    >
      {!level ? (
        <ListItemIcon>{menu.icon({ isActive })}</ListItemIcon>
      ) : level === 1 ? (
        <ListItemIcon>
          <Box
            ml={1.7}
            borderRadius="100%"
            width={5}
            height={5}
            sx={{
              backgroundColor: ({ palette }) => palette.grey[800],
            }}
          />
        </ListItemIcon>
      ) : null}
      <ListItemText
        sx={{
          ".MuiTypography-root": {
            fontWeight: 600,
            pl: !level || level === 1 ? 0 : 4.5,
            color: ({ color }) => isActive ? 'white' : color.bmw[500],
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
      sx={{
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        p: "8px 12px",
        backgroundColor: ({ color }) => isActive ? color.accent[400] : "transparent",
        ":hover": {
          backgroundColor: ({ color }) => color.accent[400],
          '.MuiTypography-root': {
            color: 'white'
          }
        }
      }}
    >
      {!level ? (
        <ListItemIcon>{menu.icon({ isActive })}</ListItemIcon>
      ) : level === 1 ? (
        <ListItemIcon>
          <Box
            ml={1.7}
            borderRadius="100%"
            width={5}
            height={5}
            sx={{
              backgroundColor: ({ palette }) => palette.grey[800],
            }}
          />
        </ListItemIcon>
      ) : null}
      <ListItemText
        sx={{
          ".MuiTypography-root": {
            fontWeight: 600,
            pl: !level || level === 1 ? 0 : 4.5,
            color: ({ color }) => isActive ? 'white' : color.bmw[500]
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
