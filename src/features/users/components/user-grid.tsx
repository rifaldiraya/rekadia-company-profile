"use client";

import {
  CoreDataGrid,
  withCoreDataGrid,
  WithCoreDataGridProps,
} from "@/components/core/core-datagrid";
import { DeleteRounded, EditRounded, ShieldRounded } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { UserSchema } from "@/features/users/schema/user-schema";
import useDeleteUser from "@/features/users/hook/use-delete-user";
import useDialog from "@/hook/use-dialog";
import { GridColDef } from "@mui/x-data-grid-premium";
import useUserActionStore from "@/features/users/store/user-action-store";

interface UserGridProps extends WithCoreDataGridProps<UserSchema> {}

function UserGrid({
  initialState,
  query,
  paginationModel,
  onPaginationModelChange,
  onSortModelChange,
  pageSizeOptions,
  onSearchChange,
  getFilterValue,
  rowCount,
}: UserGridProps) {
  const { mutateAsync } = useDeleteUser();
  const { openDialog } = useDialog();
  const { setState } = useUserActionStore();

  const handleOpenUserModal = () =>
    setState({ mode: "create", refetch: query.refetch });

  const handleDeleteModal = async (username: string) => {
    openDialog({
      onConfirm: async () => mutateAsync({ username }),
      severity: "error",
      supportText: "Are you sure want to remove this user?",
      title: "Delete confirmation",
      cancelText: "Cancel",
      confirmText: "Delete",
      confirmCallback: () => query.refetch(),
    });
  };

  const handleSearch = (value: string) => onSearchChange("displayName", value);

  const handleEditUser = (user: UserSchema) => {
    setState({
      mode: "update",
      value: user,
      refetch: query.refetch,
    });
  };

  const handleAssignRole = (user: UserSchema) => {
    setState({
      mode: "assign-role",
      value: { userName: user.userName },
    });
  };

  const columns: GridColDef<UserSchema>[] = [
    {
      field: "action",
      headerName: "",
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <IconButton size="small" onClick={() => handleAssignRole(params.row)}>
            <ShieldRounded fontSize="small" />
          </IconButton>
          <IconButton
            disabled
            size="small"
            onClick={() => handleEditUser(params.row)}
          >
            <EditRounded fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteModal(params.row.userName)}
          >
            <DeleteRounded fontSize="small" />
          </IconButton>
        </Stack>
      ),
      minWidth: 150,
    },
    {
      field: "displayName",
      headerName: "Name",
      width: 250,
    },
    {
      field: "userName",
      headerName: "Username",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  return (
    <CoreDataGrid>
      <CoreDataGrid.Header title="Users" supportText="User management">
        <Button onClick={handleOpenUserModal}>Add user</Button>
      </CoreDataGrid.Header>
      <CoreDataGrid.Toolbar>
        <TextField
          size="small"
          placeholder="Search by name"
          sx={{ maxWidth: 300 }}
          fullWidth
          value={getFilterValue("displayName")}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </CoreDataGrid.Toolbar>
      <CoreDataGrid.Grid<UserSchema>
        disableRowSelectionOnClick
        loading={query.isFetching}
        columns={columns}
        pagination
        paginationMode="server"
        rows={query.data?.data ?? []}
        initialState={initialState}
        paginationModel={paginationModel}
        pageSizeOptions={pageSizeOptions}
        onPaginationModelChange={onPaginationModelChange}
        onSortModelChange={onSortModelChange}
        rowCount={rowCount}
      />
    </CoreDataGrid>
  );
}

export default withCoreDataGrid(UserGrid, {
  queryKey: ["user", "grid"],
  url: "/user/grid",
});
