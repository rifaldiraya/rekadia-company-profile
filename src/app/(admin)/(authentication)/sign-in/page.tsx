import { Metadata } from "next";
import { APP_NAME } from "@/constants";
import SignInPage from "@/features/sign-in/sign-in-page";

export const metadata: Metadata = {
  title: `${APP_NAME} - Sign In`,
};

export default function Page() {
  return <SignInPage />;
}
