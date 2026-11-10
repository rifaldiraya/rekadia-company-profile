import MainLayout from "@/components/layout/main-layout";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
