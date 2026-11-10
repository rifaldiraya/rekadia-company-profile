import { AuthenticationLayout } from "@/components/layout";
import ForgotPasswordPage from "@/features/forgot-password/forgot-password-page";

export default function Page() {
  return (
    <AuthenticationLayout title="Forgot password">
      <ForgotPasswordPage />
    </AuthenticationLayout>
  );
}
