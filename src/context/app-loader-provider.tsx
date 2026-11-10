import { useAppLoader } from "@/hook/use-app-loader";
import { Backdrop, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface AppLoadingProviderProps {
  children: ReactNode;
}

export default function AppLoaderProvider({
  children,
}: AppLoadingProviderProps) {
  const { isLoading } = useAppLoader();

  return (
    <>
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
