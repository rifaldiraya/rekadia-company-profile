import SettingsLayout from "@/features/settings/settings-layout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
