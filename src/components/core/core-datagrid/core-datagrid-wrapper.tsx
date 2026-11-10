import { Box } from "@mui/material";
import { ReactNode } from "react";

export interface CoreDataGridProviderProps {
  children: ReactNode;
}

export default function CoreDataGridWrapper({
  children,
}: CoreDataGridProviderProps) {
  return (
    <Box
      border={({ palette }) => `1px solid ${palette.divider}`}
      borderRadius={({ shape }) => `${shape.borderRadius}px`}
    >
      {children}
    </Box>
  );
}
