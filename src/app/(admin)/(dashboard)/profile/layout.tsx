import ProfileLayout from "@/features/profile/profile-layout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
