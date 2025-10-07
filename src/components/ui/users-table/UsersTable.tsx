import { useState } from "react";
import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "../../../hooks/useUsers";
import type { User } from "../../../services/users/users.services.types";
import { DataTable } from "../data-table/DataTable";
import { DataTableToolbar } from "../data-table/DataTableToolbar";
import DeleteUserModal from "./DeleteUserModal";
import { useUserColumns } from "./useUserColumns";
import { Button } from "../Button";
import UserModal from "./UserModal";

export const UsersTable = () => {
  const { data = [], isLoading, isError, refetch } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | "create">("view");
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateUser(selectedUser?.id ?? 0);
  const createMutation = useCreateUser();
  const deleteMutation = useDeleteUser();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const columns = useUserColumns({
    onView: (user) => {
      setSelectedUser(user);
      setMode("view");
      setOpen(true);
    },
    onEdit: (user) => {
      setSelectedUser(user);
      setMode("edit");
      setOpen(true);
    },
    onDelete: (user) => {
      setSelectedUser(user);
      setConfirmDeleteOpen(true);
    },
  });

  if (isError) {
    return (
      <div className="w-full rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center text-destructive">
        Failed to load users.
        <button className="ml-2 underline" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex items-center justify-end">
          <Button
            onClick={() => {
              setSelectedUser(null);
              setMode("create");
              setOpen(true);
            }}
          >
            Add User
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        toolbar={(table) => (
          <DataTableToolbar
            table={table}
            placeholder="Search users..."
            onReset={() => table.resetSorting()}
          />
        )}
        emptyMessage="No users found"
      />

      <UserModal
        open={open}
        mode={mode}
        user={selectedUser ?? undefined}
        onClose={() => setOpen(false)}
        onSubmit={async (values) => {
          if (mode === "create") {
            await createMutation.mutateAsync(values);
            return;
          }
          if (!selectedUser) return;
          await updateMutation.mutateAsync(values);
        }}
      />
      <DeleteUserModal
        open={confirmDeleteOpen}
        user={selectedUser}
        loading={deleteMutation.isPending}
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={async () => {
          if (!selectedUser) return;
          await deleteMutation.mutateAsync(selectedUser.id);
          setConfirmDeleteOpen(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
};

export default UsersTable;
