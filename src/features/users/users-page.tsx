"use client";

import UserFormModal from "@/features/users/components/user-form-modal";
import UserGrid from "@/features/users/components/user-grid";
import ErrorBoundary from "@/components/error-boundary";
import AssignRoleModal from "@/features/users/components/assign-role-modal";

function UsersPage() {
  return (
    <>
      <ErrorBoundary>
        <UserGrid />
      </ErrorBoundary>
      <UserFormModal />
      <AssignRoleModal />
    </>
  );
}

export default UsersPage;
