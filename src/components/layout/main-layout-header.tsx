'use client'

import { Box, Breadcrumbs, Typography } from "@mui/material";
import { ChevronRightRounded } from "@mui/icons-material";
import Link from "next/link";
import type { ReactNode } from "react";

interface MainLayoutHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href: string }[];
  description?: ReactNode;
  actions?: ReactNode;
}

export default function MainLayoutHeader({
  title,
  breadcrumbs,
  description,
  actions,
}: MainLayoutHeaderProps) {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ sm: "flex-end" }}
      justifyContent="space-between"
      gap={2}
      mb="24px"
    >
      <Box sx={{ minWidth: 0 }}>
        {breadcrumbs && (
          <Breadcrumbs separator={<ChevronRightRounded sx={{ fontSize: 16 }} />} sx={{ mb: 0.5, fontSize: 13 }}>
            {breadcrumbs
              .map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                    <Typography 
                      key={breadcrumb.label + index}
                      component={Link}
                      href={breadcrumb.href}
                      sx={{
                        fontSize: 13,
                        fontWeight: isLast ? 600 : 500,
                        color: isLast ? "#006876" : "#667991",
                        textDecoration: "none",
                        "&:hover": { color: "#25c1da" },
                      }}
                    >
                      {breadcrumb.label}
                    </Typography>
                );
              })}
          </Breadcrumbs>
        )}
        <Typography fontSize={{ xs: "24px", sm: "28px" }} fontWeight={700} color="#22272f" variant="h1" sx={{ wordBreak: "break-word" }}>
          {title}
        </Typography>
        {description && (
          <Typography component="div" sx={{ mt: 0.5, fontSize: 14, color: "#667991" }}>
            {description}
          </Typography>
        )}
      </Box>
      {actions && <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>{actions}</Box>}
    </Box>
  );
}
