'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';

import type { TPayment } from '@/app/types';
import { Modal } from '@/components/layouts/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { isMemberOptions } from '@/query-options/committee';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, IndianRupee } from 'lucide-react';
import { useState } from 'react';
import { EditPaymentForm } from './edit-payment-form';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const row = table.getRowModel().rows.at(0);
  const { data: isMember } = useQuery(
    isMemberOptions((row?.original as TPayment).committee)
  );

  const descFilterValue =
    (table.getColumn('desc')?.getFilterValue() as string) ?? '';
  const senderFilterValue =
    (table.getColumn('paid_by')?.getFilterValue() as string) ?? '';
  const totalForSelected = table
    .getRowModel()
    .rows.reduce((acc, b) => acc + (b.original as TPayment).amount, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-end px-4">
        <Input
          className="max-w-sm"
          onChange={(event) =>
            table.getColumn('desc')?.setFilterValue(event.target.value)
          }
          placeholder="Filter by Description"
          value={descFilterValue}
        />
        {descFilterValue && (
          <Badge>
            Total For Selected:{' '}
            <IndianRupee className="size-3.5 text-primary-foreground" />
            {totalForSelected}
          </Badge>
        )}
      </div>
      <div className="flex flex-col items-end px-4">
        <Input
          className="max-w-sm"
          onChange={(event) =>
            table.getColumn('paid_by')?.setFilterValue(event.target.value)
          }
          placeholder="Filter by Sender"
          value={senderFilterValue}
        />
        {senderFilterValue && (
          <Badge>
            Total For Selected:{' '}
            <IndianRupee className="size-3.5 text-primary-foreground" />
            {totalForSelected}
          </Badge>
        )}
      </div>

      <div className="border">
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
                <Modal
                  content={
                    <EditPaymentForm
                      isMember={!!isMember}
                      payment={row.original as TPayment}
                    />
                  }
                  key={row.id}
                  title="Edit details"
                >
                  <TableRow
                    className="cursor-pointer"
                    data-state={row.getIsSelected() && 'selected'}
                    key={row.id}
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
                </Modal>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="icon"
            variant="ghost"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="text-muted-foreground text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="icon"
            variant="ghost"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
