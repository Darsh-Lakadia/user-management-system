import type { Table } from "@tanstack/react-table";
import { Button } from "../Button";
import { Input } from "../Input";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder?: string;
  onReset?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  placeholder = "Search...",
  onReset,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 w-full md:max-w-sm">
        <Input
          placeholder={placeholder}
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        {isFiltered && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.resetGlobalFilter();
              table.resetColumnFilters();
              onReset?.();
            }}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
