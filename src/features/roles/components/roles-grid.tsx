import { useCallback, useEffect, useState } from "react";
import { CoreDataGrid } from "@/components/core/core-datagrid";
import { SUPER_ADMIN } from "@/constants";
import useDeleteRole from "@/features/roles/hook/use-delete-role";
import useGetRoles from "@/features/roles/hook/use-get-roles";
import useDialog from "@/hook/use-dialog";
import { DeleteRounded } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { useIsRoleModalOpenStore } from "../store/is-role-modal-open-store";

export default function RolesGrid() {
  const { data, isLoading, refetch } = useGetRoles();
  const { mutateAsync } = useDeleteRole();
  const [deleteRole, setDeleteRole] = useState("");
  const { setIsOpen } = useIsRoleModalOpenStore();

  const { openDialog } = useDialog();

  const handleDeleteModal = useCallback(() => {
    if (!deleteRole) return;

    const cancelCallback = () => {
      setDeleteRole("");
      refetch();
    };

    openDialog({
      onConfirm: () => mutateAsync(deleteRole),
      confirmCallback: () => refetch(),
      cancelCallback,
      severity: "error",
      supportText: "Are you sure want to delete this item?",
      title: "Delete Confirmation",
      cancelText: "Cancel",
      confirmText: "Delete",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteRole, mutateAsync, setDeleteRole, refetch]);

  useEffect(() => {
    handleDeleteModal();
  }, [handleDeleteModal]);

  return (
    <CoreDataGrid>
      <CoreDataGrid.Header title="Role" supportText="Role management">
        <Button onClick={() => setIsOpen(true)}>Add role</Button>
      </CoreDataGrid.Header>
      <CoreDataGrid.Grid
        getRowId={(row) => row.name}
        loading={isLoading}
        disableRowSelectionOnClick
        columns={[
          {
            field: "action",
            headerName: "",
            width: 80,
            renderCell: (params) => (
              <Stack direction="row" spacing={1}>
                <IconButton
                  disabled={params.row.name === SUPER_ADMIN}
                  onClick={() => setDeleteRole(params.row.name)}
                  size="small"
                >
                  <DeleteRounded fontSize="small" />
                </IconButton>
              </Stack>
            ),
          },
          {
            field: "name",
            headerName: "Role",
            flex: 1,
          },
        ]}
        rows={data?.data ?? []}
      />
    </CoreDataGrid>
  );
}
