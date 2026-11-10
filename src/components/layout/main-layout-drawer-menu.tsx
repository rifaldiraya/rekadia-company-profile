// eslint-disable-next-line import/no-cycle
import { MainLayoutDrawerMenuItem } from "@/components/layout/main-layout-drawer-menu-item";
import { IMenuConfig } from "@/config/menu.config";
import { List } from "@mui/material";
import { useSession } from "next-auth/react";

export interface MainLayoutDrawerMenuProps {
  menuConfig: IMenuConfig[];
  level: number;
}

export default function MainLayoutDrawerMenu({
  menuConfig,
  level,
}: MainLayoutDrawerMenuProps) {
  const { data } = useSession();
  const permissions = data?.user.permissions ?? [];
  const roles = data?.user.roles ?? [];

  return (
    <List disablePadding>
      {menuConfig.map((menu) => (
        <MainLayoutDrawerMenuItem
          menu={menu}
          key={`${menu.route}-${menu.label}`}
          level={level}
          permissions={permissions}
          roles={roles}
        />
      ))}
    </List>
  );
}
