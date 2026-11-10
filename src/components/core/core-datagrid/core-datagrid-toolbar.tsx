import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface CoreDataGridToolbarProps extends BoxProps {
  children?: ReactNode;
}
export default function CoreDataGridToolbar({
  children,
  ...props
}: CoreDataGridToolbarProps) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        gap: 1,
        p: 1.5,
        borderBottom: ({ palette }) => `1px solid ${palette.divider}`,
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
}
