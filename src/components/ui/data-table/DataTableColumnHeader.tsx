import type { Column } from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { cn } from "../../../utils/cn";
import { Button } from "../Button";

export interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("font-medium", className)}>{title}</div>;
  }

  const sorted = column.getIsSorted();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(sorted === "asc")}
        className="-ml-2 px-2 py-1"
      >
        <span className="mr-2 font-medium">{title}</span>
        {sorted === "asc" ? (
          <FaSortUp className="h-4 w-4" />
        ) : sorted === "desc" ? (
          <FaSortDown className="h-4 w-4" />
        ) : (
          <FaSort className="h-4 w-4 opacity-60" />
        )}
      </Button>
    </div>
  );
}
