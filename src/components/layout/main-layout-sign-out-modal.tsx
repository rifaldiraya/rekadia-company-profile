import { CoreDialog } from "@/components/core";
import { signOut } from "next-auth/react";
import { useSignOutModalStore } from "./store/use-sign-out-modal-store";

export default function MainLayoutSignOutModal() {
  const { closeModal, isOpen } = useSignOutModalStore();

  return (
    <CoreDialog
      isOpen={isOpen}
      title="Sign out"
      severity="error"
      onClose={closeModal}
      onConfirm={() => signOut({ callbackUrl: "/sign-in" })}
      supportText="Are you sure want to end this session?"
    />
  );
}
