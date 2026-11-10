import { SignInSchema } from "@/features/sign-in/schema/sign-in-schema";
import { signIn } from "next-auth/react";
import { enqueueSnackbar } from "notistack";

export default function useSignIn() {
  const credentials = async (body: SignInSchema) => {
    const res = await signIn("credentials", { ...body, redirect: false });

    if (!res?.ok) {
      if (res?.error === "CredentialsSignin") {
        enqueueSnackbar({
          message: "Invalid credentials",
          variant: "error",
        });

        throw new Error(res.error);
      } else {
        enqueueSnackbar({
          message: "Something went wrong, please contact your administrator",
          variant: "error",
        });
      }
    }

    return res;
  };

  return { credentials };
}
