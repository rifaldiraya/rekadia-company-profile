import { Box } from "@mui/material";
import { ReactNode } from "react";

interface CoreDataGridContainerProps {
  children: ReactNode;
}

export default function CoreDataGridContainer({
  children,
}: CoreDataGridContainerProps) {
  return (
    <Box
      border={({ palette }) => `1px solid ${palette.divider}`}
      borderRadius={({ shape }) => `${shape.borderRadius}px`}
    >
      {children}
    </Box>
  );
}
