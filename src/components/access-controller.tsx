import { ActionEnum } from "@/config/access-control.config";
import { SUPER_ADMIN } from "@/constants";
import { useSession } from "next-auth/react";
import { ReactNode, useMemo } from "react";

export interface AccessControllerProps {
  children: ReactNode;
  moduleName: string;
  action: ActionEnum;
}

export default function AccessController({
  children,
  moduleName,
  action,
}: AccessControllerProps): ReactNode {
  const { data } = useSession();

  const isSuperAdmin = data?.user.roles.includes(SUPER_ADMIN) ?? false;

  const hasPermit = useMemo(() => {
    let permit = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const permission of data?.user.permissions ?? []) {
      if (
        permission.type === moduleName &&
        permission.values.includes(action)
      ) {
        permit = true;
      }
    }

    return permit || isSuperAdmin;
  }, [isSuperAdmin, data?.user.permissions, moduleName, action]);

  if (!hasPermit) return null;

  return children;
}
