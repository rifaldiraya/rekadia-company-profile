"use client";

import useUserForm from "@/features/users/hook/use-user-form";
import useUserActionStore from "@/features/users/store/user-action-store";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

function UserFormModal() {
  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useUserForm();
  const { state: userAction, setState: setUserAction } = useUserActionStore();

  const handleClose = () => {
    setUserAction(null);
  };

  const isEdit = userAction?.mode === "update";
  const open = userAction?.mode === "create" || isEdit;

  return (
    <Dialog open={!!open}>
      <form onSubmit={onSubmit} noValidate>
        <DialogTitle>{isEdit ? "Update" : "Create"} user</DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            <TextField
              {...register("email")}
              label="Email"
              helperText={errors.email?.message}
              error={!!errors.email}
              disabled={!!isEdit}
            />
            <TextField
              {...register("userName")}
              label="Username"
              helperText={errors.userName?.message}
              error={!!errors.userName}
              disabled={!!isEdit}
            />
            <TextField
              {...register("displayName")}
              label="Display name"
              helperText={errors.displayName?.message}
              error={!!errors.displayName}
            />
          </Stack>
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

export default UserFormModal;
