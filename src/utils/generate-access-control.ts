// eslint-disable-next-line import/no-cycle
import { ActionEnum } from "@/config/access-control.config";

export interface AccessControlGeneratorResult<T> {
  name: T;
  actions: ActionEnum[];
}
/**
 * Generate an array of access control objects from an array of module names.
 *
 * @param {T[]} moduleNames - An array of module names.
 * @returns {AccessControlGeneratorResult<T>[]} - An array of access control objects.
 */
export function generateAccessControl<T>(
  moduleNames: T[],
): AccessControlGeneratorResult<T>[] {
  return moduleNames.map((name) => ({
    name,
    actions: [],
  }));
}
