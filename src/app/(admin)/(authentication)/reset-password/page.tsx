import { AuthenticationLayout } from "@/components/layout";
import ResetPasswordPage from "@/features/reset-password/reset-password-page";

export default function ResetPage() {
  return (
    <AuthenticationLayout title="Reset password">
      <ResetPasswordPage />
    </AuthenticationLayout>
  );
}
