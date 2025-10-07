import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import type { User } from "../../../services/users/users.services.types";
import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Button } from "../Button";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export interface UseUserColumnsOptions {
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export const useUserColumns = (
  options: UseUserColumnsOptions = {}
): ColumnDef<User, unknown>[] => {
  const { onView, onEdit, onDelete } = options;
  return useMemo<ColumnDef<User, unknown>[]>(
    () => [
      {
        accessorKey: "avatar",
        header: () => <span className="sr-only">Avatar</span>,
        cell: ({ row }) => (
          <img
            src={row.original.avatar}
            alt={row.original.name}
            className="h-8 w-8 rounded-full object-cover border border-line"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {row.original.name}
            </span>
            <span className="text-xs text-muted-foreground md:hidden break-all">
              {row.original.email}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground break-all">
            {row.original.email}
          </span>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => <span>{row.original.role}</span>,
      },
      {
        accessorKey: "actions",
        header: () => <span>Actions</span>,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="p-0 text-sky-600 hover:text-sky-700"
              size="sm"
              onClick={() => onView?.(row.original)}
            >
              <FaEye />
            </Button>
            <Button
              variant="ghost"
              className="p-0 text-violet-600 hover:text-violet-700"
              size="sm"
              onClick={() => onEdit?.(row.original)}
            >
              <FaEdit />
            </Button>
            <Button
              variant="ghost"
              className="p-0 text-red-600 hover:text-red-700"
              size="sm"
              onClick={() => onDelete?.(row.original)}
            >
              <FaTrash />
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onView, onDelete]
  );
};
