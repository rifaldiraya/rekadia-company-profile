"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { themeConfig } from "@/config/theme.config";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LicenseInfo } from "@mui/x-license";
import { MUI_LICENSE } from "@/constants";
import { QueryClientProvider } from "@tanstack/react-query";
import AppLoaderProvider from "@/context/app-loader-provider";
import { DialogProvider } from "@/context/dialog-context";
import queryClientConfig from "@/config/query-client.config";

interface ProviderProps {
  children: ReactNode;
}

LicenseInfo.setLicenseKey(MUI_LICENSE);

export default function Provider({ children }: ProviderProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClientConfig}>
        <ThemeProvider theme={themeConfig}>
          <AppLoaderProvider>
            <DialogProvider>
              <CssBaseline />
              {children}
              <SnackbarProvider
                maxSnack={4}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              />
            </DialogProvider>
          </AppLoaderProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
