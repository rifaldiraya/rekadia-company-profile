import { Metadata } from "next";
import { AuthenticationLayout } from "@/components/layout";
import { BRAND_NAME } from "@/constants";
import SignInPage from "@/features/sign-in/sign-in-page";

export const metadata: Metadata = {
  title: `${BRAND_NAME} - Sign In`,
};

export default function Page() {
  return (
    <AuthenticationLayout title="Sign in to platform">
      <SignInPage />
    </AuthenticationLayout>
  );
}
