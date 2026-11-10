import { SignInSchema } from "@/features/sign-in/schema/sign-in-schema";
import { signIn } from "next-auth/react";

export type SignInResult = { ok: true } | { ok: false; message: string };

export default function useSignIn() {
  const credentials = async (body: SignInSchema): Promise<SignInResult> => {
    const res = await signIn("credentials", { ...body, redirect: false });

    if (res?.ok) return { ok: true };
    if (res?.error === "CredentialsSignin") {
      return { ok: false, message: "Email/username or password is incorrect." };
    }
    return { ok: false, message: "Something went wrong, please try again." };
  };

  return { credentials };
}
