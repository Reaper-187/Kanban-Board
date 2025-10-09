import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowData,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Ellipsis,
  MoreHorizontal,
  NotepadText,
  Pen,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { type Task } from "@/components/Types/types";
import type { Color } from "../../Task-Card/ListCards/TaskCardList";
import { DropdownSwitchStatus } from "@/components/DropDownMenu/DropDown";
import { useToggle } from "@/Context/AddBtnContext";

export type TableProps = {
  tasks: Task[];
  onStatusChange: (_id: string, updates: Partial<Task>) => void;
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onStatusChange: (_id: string, updates: Partial<Task>) => void;
    openModal: (task: Task) => void;
    openDescription: (task: Task) => void;
  }
}

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "topic",
    header: "Topic",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("topic")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Due Date",
    cell: ({ row }) => {
      const rawDate: string | number = row.getValue("date");
      const localFormatedDate = new Date(rawDate).toLocaleDateString("de-DE");
      const formatedDate = localFormatedDate.split(".");
      const day = formatedDate[0].padStart(2, "0");
      const month = formatedDate[1].padStart(2, "0");
      const year = formatedDate[2];
      return <div>{`${day}.${month}.${year}`}</div>;
    },
  },
  {
    accessorKey: "importance",
    header: "Importance",
    cell: ({ row }) => {
      const importanceColor: Record<keyof Color, string> = {
        Urgent: "bg-red-600",
        Lead: "bg-orange-400",
        High: "bg-red-400",
        Medium: "bg-yellow-200",
        Low: "bg-gray-200",
      };
      const colorPick =
        importanceColor[row.getValue("importance") as keyof Color];

      return (
        <div
          className={
            colorPick
              ? `${colorPick} px-2 py-1 w-fit rounded-xl text-xs sm:text-sm`
              : ""
          }
        >
          {row.getValue("importance")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const STATUS_LABELS: Record<string, string> = {
        TODO: "To Do",
        IN_PROGRESS: "In Progress",
        DONE: "Done",
      };
      const value = row.getValue("status") as string;
      return <div className="capitalize">{STATUS_LABELS[value] || value}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const task = row.original;
      const { onStatusChange, openModal, openDescription } =
        table.options.meta!;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 h-auto w-auto">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Button
              type="button"
              onClick={() => {
                openDescription(task);
              }}
              className="w-full"
            >
              <NotepadText size={15} className="cursor-pointer" />
            </Button>
            <DropdownMenuSeparator />
            <DropdownSwitchStatus
              value={task.status}
              onChange={(newStatus) => {
                onStatusChange(task._id, { status: newStatus });
                document.body.style.pointerEvents = "auto";
              }}
            />
            <DropdownMenuSeparator />
            <Button
              type="button"
              onClick={() => openModal(task)}
              className="w-full"
            >
              <Pen size={15} className="cursor-pointer" />
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TableContainer({ tasks, onStatusChange }: TableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const { openModal, openDescription } = useToggle();

  const table = useReactTable({
    data: tasks,
    columns,
    meta: {
      onStatusChange,
      openModal,
      openDescription,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search tasks..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
