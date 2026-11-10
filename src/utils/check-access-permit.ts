import { ActionEnum } from "@/config/access-control.config";
import { SUPER_ADMIN } from "@/constants";

/**
 * Checks if the specified actions are permitted for a given module name
 * based on the provided permissions and roles.
 *
 * @param moduleName - The name of the module to check permissions for.
 * @param actions - An array of actions to verify if they are permitted.
 * @param permissions - An array of permission objects, each containing a type
 *                      and an array of values representing allowed actions.
 * @param roles - An array of roles associated with the user, including special
 *                roles like SUPER_ADMIN.
 * @returns A boolean indicating whether the actions are permitted for the module
 *          under the given permissions and roles.
 */
const checkAccessPermit = (
  moduleName: string,
  actions: ActionEnum[],
  permissions: { type: string; values: string[] }[],
  roles: string[],
) => {
  const permit = false;

  // eslint-disable-next-line no-restricted-syntax
  for (const permission of permissions ?? []) {
    if (permission.type === moduleName) {
      if (permission.values.every((value) => actions.includes(value as any))) {
        return true;
      }
    }
  }

  return permit || roles.includes(SUPER_ADMIN);
};

export default checkAccessPermit;
