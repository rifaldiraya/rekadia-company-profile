import { MainLayoutHeader } from "@/components/layout";
import ChangePasswordPage from "@/features/change-password/change-password-page";
import ProfileHeader from "@/features/profile/components/profile-header";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <MainLayoutHeader title="Profile" />
      <ProfileHeader />
      <ChangePasswordPage />
      {children}
      {/* <ProfileTabs>
        {children}
      </ProfileTabs> */}
    </Box>
  );
}
