"use client";

import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ProfileTabs({ children }: { children: ReactNode }) {
  const { username } = useParams();
  const pathname = usePathname();

  const tabs = [
    // {
    //   label: "Details",
    //   path: username.toString(),
    // },
    {
      label: "Change password",
      path: `${username}/change-password`,
    },
  ];

  const value = pathname.split("/").slice(2).join().replaceAll(",", "/");

  return (
    <TabContext value={value}>
      <Box display="flex">
        <Tabs value={value} aria-label="profile-tab" orientation="vertical">
          {tabs.map((tab) => (
            <Tab
              value={tab.path}
              LinkComponent={Link}
              href={`/profile/${tab.path}`}
              label={tab.label}
              key={tab.path}
            />
          ))}
        </Tabs>
        <TabPanel value={String(value)}>
          <Typography variant="h3" mb={2}>
            {tabs.find((tab) => tab.path === value)?.label}
          </Typography>
          {children}
        </TabPanel>
      </Box>
    </TabContext>
  );
}
