import { create } from "zustand";

interface IsRoleModalOpenStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useIsRoleModalOpenStore = create<IsRoleModalOpenStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
