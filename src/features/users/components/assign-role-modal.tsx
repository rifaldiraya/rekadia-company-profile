"use client";

import { useEffect } from "react";
import { SUPER_ADMIN } from "@/constants";
import useGetRoles from "@/features/roles/hook/use-get-roles";
import useAssignRoleForm from "@/features/users/hook/use-assign-role-form";
import useGetUserDetail from "@/features/users/hook/use-get-user-detail";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Stack,
} from "@mui/material";
import useUserActionStore from "../store/user-action-store";

export default function AssignRoleModal() {
  const { state, setState } = useUserActionStore();
  const {
    onSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useAssignRoleForm();

  const { data: userDetailData, isLoading: userDataLoading } = useGetUserDetail(
    state?.value?.userName ?? "",
  );

  const { data, isLoading } = useGetRoles();

  const roles = watch("roles");

  const handleClose = () => {
    setState(null);
    reset();
  };

  const handleChangeBox = (role: string, checked: boolean) => {
    if (checked) {
      setValue("roles", [...roles, role]);
    } else {
      setValue(
        "roles",
        roles.filter((i) => i !== role),
      );
    }
  };

  useEffect(() => {
    setValue("roles", userDetailData?.data.roles ?? []);
  }, [userDetailData, setValue]);

  return (
    <Dialog open={state?.mode === "assign-role"}>
      <form onSubmit={onSubmit} noValidate>
        <DialogTitle>Assign role</DialogTitle>
        <DialogContent>
          {userDataLoading || isLoading ? (
            <Stack alignItems="center">
              <CircularProgress size={28} />
            </Stack>
          ) : (
            <>
              <FormGroup>
                {data?.data.map(
                  (item) =>
                    item.name !== SUPER_ADMIN && (
                      <FormControlLabel
                        key={item.name}
                        control={
                          <Checkbox
                            onChange={(e, checked) =>
                              handleChangeBox(item.name, checked)
                            }
                            disabled={item.name === SUPER_ADMIN}
                            checked={roles?.includes(item.name)}
                          />
                        }
                        label={item.name}
                      />
                    ),
                )}
              </FormGroup>
              {!!errors.roles && (
                <FormHelperText error>{errors.roles?.message}</FormHelperText>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={handleClose}
            color="inherit"
            variant="text"
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            loading={isSubmitting}
            type="submit"
            size="large"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
