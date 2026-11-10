import { MainLayoutHeader } from "@/components/layout";
import ChangePasswordForm from "@/features/change-password/components/change-password-form";
import { Box } from "@mui/material";

export default function ChangePasswordPage() {
  return (
    <Box>
      <MainLayoutHeader title="Change Password" />
      <ChangePasswordForm />
    </Box>
  );
}
