import { create } from "zustand";

type State = {
  isOpen: boolean;
  openModal: () => void;
closeModal: () => void;
}

export const useSignOutModalStore = create<State>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
