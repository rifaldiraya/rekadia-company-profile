// eslint-disable-next-line import/no-cycle
import { generateAccessControl } from "@/utils/generate-access-control";

export enum ModuleNameEnum {
  Settings = "Settings",
  Documentation = "Documentation",
}
export enum ActionEnum {
  Create = "Create",
  Read = "Read",
  Update = "Update",
  Delete = "Delete",
}

export const accessControl = generateAccessControl<ModuleNameEnum>(
  Object.values(ModuleNameEnum),
);
export const actions: ActionEnum[] = Object.values(ActionEnum);
