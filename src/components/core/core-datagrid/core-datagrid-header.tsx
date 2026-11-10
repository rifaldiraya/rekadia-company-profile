import { Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CoreDataGridHeaderProps {
  title: string;
  supportText?: string;
  children?: ReactNode;
}
export default function CoreDataGridHeader({
  title,
  supportText = "",
  children,
}: CoreDataGridHeaderProps) {
  return (
    <Box
      p={1.5}
      display="flex"
      justifyContent="space-between"
      borderBottom={({ palette }) => `1px solid ${palette.divider}`}
      alignItems="flex-end"
    >
      <Stack spacing={1} maxWidth={400}>
        <Typography fontWeight={600} variant="h3" fontSize={22}>
          {title}
        </Typography>
        <Typography fontSize="sm">{supportText}</Typography>
      </Stack>
      <Box>{children}</Box>
    </Box>
  );
}

