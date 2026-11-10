import { ReactNode } from "react";
import Image from "next/image";
import { Box, Paper, Stack, Typography } from "@mui/material";

interface AuthenticationLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AuthenticationLayout({
  children,
  title,
}: AuthenticationLayoutProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        spacing={3}
      >
        <Paper sx={{ width: "100%", maxWidth: "500px", mx: "auto", p: 1.5 }}>
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h1" fontSize="22px" fontWeight={700}>
              {title}
            </Typography>
            <Image width={50} height={50} src="/logo.png" alt="" />
          </Box>
          {children}
        </Paper>
      </Stack>
    </Box>
  );
}
