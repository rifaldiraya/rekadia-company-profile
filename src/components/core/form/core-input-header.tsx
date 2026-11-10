import React, { ReactNode } from "react";
import { Box } from "@mui/material";

type TInputHeaderProps = {
  children: ReactNode;
  required?: boolean;
};

export default function InputHeader({
  children,
  required = false,
}: TInputHeaderProps) {
  return (
    <Box sx={{ display: "flex", fontSize: "14px", fontWeight: 600, mb: "6px" }}>
      {children}
      {required ? <Box sx={{ ml: "3px", color: "red" }}> *</Box> : undefined}
    </Box>
  );
}
