import { create } from "zustand";
import { UserSchema } from "@/features/users/schema/user-schema";

interface CreateUserValue {
  mode: "create";
  value?: never;
  refetch: () => void;
}
interface UpdateUserValue {
  mode: "update";
  value: UserSchema;
  refetch: () => void;
}
interface AssignUserRoleValue {
  mode: "assign-role";
  value: Pick<UserSchema, "userName">;
}

type UserAction =
  | CreateUserValue
  | UpdateUserValue
  | AssignUserRoleValue
  | null;

interface UserActionStore {
  state: UserAction;
  setState: (state: UserAction) => void;
}

const useUserActionStore = create<UserActionStore>((set) => ({
  state: null,
  setState: (state) => set({ state }),
}));

export default useUserActionStore;
