"use client";

import {
  accessControl,
  ActionEnum,
  actions,
  ModuleNameEnum,
} from "@/config/access-control.config";
import { SUPER_ADMIN } from "@/constants";
import AccessControlRoleSelect from "@/features/access-control/components/access-control-role-select";
import AccessControlTable from "@/features/access-control/components/access-control-table";
import useAddPermission from "@/features/access-control/hook/use-add-permission";
import useDeletePermission from "@/features/access-control/hook/use-delete-permission";
import useGetPermission from "@/features/access-control/hook/use-get-permission";
import {
  PermissionSchema,
  permissionSchema,
} from "@/features/access-control/schema/add-permission-schema";
import { AccessControlGeneratorResult } from "@/utils/generate-access-control";
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

function AccessControlPage() {
  const [controlState, setControlState] =
    useState<AccessControlGeneratorResult<ModuleNameEnum>[]>(accessControl);
  const [role, setRole] = useState<string>("");

  const permission = useGetPermission(role);
  const addPermission = useAddPermission();
  const deletePermission = useDeletePermission();

  const grantAllAction = (moduleName: string) => {
    const matchModule = controlState.find((state) => state.name === moduleName);

    if (!matchModule) return;

    const someActionChecked = !!matchModule?.actions.length;
    const allActionChecked = actions.every((action) =>
      matchModule.actions.includes(action),
    );

    setControlState((prev) =>
      prev.map((state) => {
        if (state.name === moduleName) {
          let val: any[];

          if (allActionChecked) {
            val = [];
          } else if (someActionChecked) {
            val = actions;
          } else {
            val = actions;
          }

          return {
            ...state,
            actions: val,
          };
        }

        return state;
      }),
    );
  };

  const handleSubmit = async () => {
    const baseClaims: PermissionSchema["claims"] = [];
    const newClaims: PermissionSchema["claims"] = [];
    const removedClaims: PermissionSchema["claims"] = [];

    // set base claims
    permission.data?.data.permissions.forEach((p) => {
      p.values.forEach((action) => {
        baseClaims.push({
          type: p.type,
          value: action,
        });
      });
    });

    // set new claims
    controlState.forEach((state) => {
      state.actions.forEach((action) => {
        newClaims.push({
          type: state.name,
          value: action,
        });
      });
    });

    // set removed claims
    baseClaims.forEach((claim) => {
      const found = newClaims.find(
        (newClaim) =>
          newClaim.type === claim.type && newClaim.value === claim.value,
      );

      if (!found) {
        removedClaims.push(claim);
      }
    });

    if (newClaims.length) {
      const validAddPayload = await permissionSchema.validate({
        roleName: role,
        claims: newClaims,
      });
      await addPermission.mutateAsync(validAddPayload);
    }
    if (removedClaims.length) {
      const validDeletePayload = await permissionSchema.validate({
        roleName: role,
        claims: removedClaims,
      });
      await deletePermission.mutateAsync(validDeletePayload);
    }

    if (!!newClaims.length || !!removedClaims.length) {
      permission.refetch();
    }
  };

  const handleGrantAccess = (moduleName: string, action: ActionEnum) => {
    setControlState((prev) =>
      prev.map((state) =>
        state.name === moduleName
          ? {
              ...state,
              actions: state.actions.includes(action)
                ? state.actions.filter((i) => i !== action)
                : [...state.actions, action],
            }
          : state,
      ),
    );
  };

  useEffect(() => {
    permission.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, permission.refetch]);

  useEffect(() => {
    permission.data?.data.permissions.forEach((p) => {
      setControlState((prev) =>
        prev.map((item) => ({
          name: item.name,
          actions: p.type === item.name ? p.values : item.actions,
        })),
      );
    });

    return () => {
      setControlState(accessControl);
    };
  }, [permission.data]);

  return (
    <Box>
      <Stack mb={2}>
        <AccessControlRoleSelect role={role} setRole={setRole} />
      </Stack>
      <>
        <AccessControlTable
          loading={permission.isLoadingEvery}
          role={role}
          controlState={controlState}
          grantAllAccess={grantAllAction}
          grantAccess={handleGrantAccess}
        />
        <Box sx={{ ml: "auto", mt: 2, display: "flex" }}>
          <Button
            onClick={handleSubmit}
            loading={addPermission.isLoading}
            disabled={role === SUPER_ADMIN}
            sx={{ ml: "auto" }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </>
    </Box>
  );
}

export default AccessControlPage;
