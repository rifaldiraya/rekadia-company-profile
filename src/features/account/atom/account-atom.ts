import { create } from "zustand";
import { IAccount } from "@/features/account/model/account-model";

interface AccountStore {
  account: IAccount | null;
  setAccount: (account: IAccount | null) => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  account: null,
  setAccount: (account) => set({ account }),
}));

export default useAccountStore;
