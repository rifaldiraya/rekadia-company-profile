"use client";

import { MainLayoutHeader } from "@/components/layout";
import { TabContext, TabPanel } from "@mui/lab";
import { Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  const value =
    (pathname === "/settings/users" && 0) ||
    (pathname === "/settings/roles" && 1) ||
    (pathname === "/settings/access-control" && 2) ||
    0;

  return (
    <>
      <MainLayoutHeader title="Settings" />
      <TabContext value={String(value)}>
        <Tabs value={value} aria-label="settings-tab">
          <Tab LinkComponent={Link} href="/settings/users" label="Users" />
          <Tab LinkComponent={Link} href="/settings/roles" label="Roles" />
          <Tab
            LinkComponent={Link}
            href="/settings/access-control"
            label="Access Control"
          />
        </Tabs>
        <TabPanel value={String(value)}>{children}</TabPanel>
      </TabContext>
    </>
  );
}
