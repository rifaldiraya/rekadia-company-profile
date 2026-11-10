import { create } from "zustand";

type State = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAppLoader = create<State>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
