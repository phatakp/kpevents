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

import type { TEventBooking } from '@/app/types';
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
import { ChevronLeft, ChevronRight, IndianRupee, Loader } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../layouts/modal';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { BookingUpdateForm } from './booking-update-form';

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
  const { data: isMember, isLoading } = useQuery(
    isMemberOptions((row?.original as TEventBooking).committee)
  );

  if (isLoading) return <Loader className="mx-auto animate-spin" />;
  if (!isMember)
    return (
      <Badge className="mx-4">Only members can view collection details</Badge>
    );

  const bookingNameFilterValue =
    (table.getColumn('booking_name')?.getFilterValue() as string) ?? '';
  const receiverFilterValue =
    (table.getColumn('receiver')?.getFilterValue() as string) ?? '';
  const totalForSelected = table
    .getRowModel()
    .rows.reduce((acc, b) => acc + (b.original as TEventBooking).amount, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-end px-4">
        <Input
          className="max-w-sm"
          onChange={(event) =>
            table.getColumn('booking_name')?.setFilterValue(event.target.value)
          }
          placeholder="Filter by Donor"
          value={bookingNameFilterValue}
        />
        {bookingNameFilterValue && (
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
            table.getColumn('receiver')?.setFilterValue(event.target.value)
          }
          placeholder="Filter by Receiver"
          value={receiverFilterValue}
        />
        {receiverFilterValue && (
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
                    <BookingUpdateForm
                      booking={row.original as TEventBooking}
                      isMember={!!isMember}
                    />
                  }
                  key={row.id}
                  title="Edit details"
                >
                  <TableRow
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
