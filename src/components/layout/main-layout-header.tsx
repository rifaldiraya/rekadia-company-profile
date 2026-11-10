'use client'

import { Box, Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";

interface MainLayoutHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function MainLayoutHeader({
  title,
  breadcrumbs,
}: MainLayoutHeaderProps) {
  return (
    <Box display="flex" justifyContent="space-between" mb="24px">
      <Box>
        <Typography mb={0.25} fontSize="30px" fontWeight={600} variant="h1">
          {title}
        </Typography>
        {breadcrumbs && (
          <Breadcrumbs separator=">">
            {breadcrumbs
              .map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                    <Typography 
                      key={breadcrumb.label + index}
                      component={Link}
                      href={breadcrumb.href}
                      sx={{ color: ({ color }) => isLast ? color.bmw[900] : color.bmw[500], textDecoration: "none" }}
                    >
                      {breadcrumb.label}
                    </Typography>
                );
              })}
          </Breadcrumbs>
        )}
      </Box>
    </Box>
  );
}
