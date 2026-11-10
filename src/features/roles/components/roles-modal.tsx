import useGetRoles from "@/features/roles/hook/use-get-roles";
import useRoleForm from "@/features/roles/hook/use-role-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useIsRoleModalOpenStore } from "../store/is-role-modal-open-store";

export default function RolesModal() {
  const { isOpen, setIsOpen } = useIsRoleModalOpenStore();
  const { refetch } = useGetRoles();

  const successCallback = () => {
    setIsOpen(false);
    refetch();
  };

  const {
    register,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useRoleForm(successCallback);

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <form onSubmit={onSubmit} noValidate>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <TextField
            {...register("roleName")}
            autoFocus
            required
            error={!!errors.roleName}
            helperText={errors.roleName?.message}
            size="medium"
            fullWidth
            sx={{ mt: 2 }}
            label="Name"
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={handleClose}
            variant="text"
            color="inherit"
            size="large"
          >
            Close
          </Button>
          <Button
            size="large"
            variant="contained"
            loading={isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
