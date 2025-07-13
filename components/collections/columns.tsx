'use client';

import type { TEventBooking } from '@/app/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { amountFormatter, cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { ChevronsUpDown, IndianRupee } from 'lucide-react';

export const columns: ColumnDef<TEventBooking>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          className="my-auto"
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'booking_name',
    header: ({ column, table }) => {
      const currentSorting = table.getState().sorting;
      const isColumnSorted = currentSorting.some(
        (sort) => sort.id === 'booking_name'
      );
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Donor Name
          <ChevronsUpDown
            className={cn(
              'size-4 text-muted-foreground',
              isColumnSorted && 'text-foreground'
            )}
          />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3 capitalize">{row.getValue('booking_name')}</div>
    ),
  },
  {
    accessorKey: 'booking_flat',
    header: ({ column, table }) => {
      const currentSorting = table.getState().sorting;
      const isColumnSorted = currentSorting.some(
        (sort) => sort.id === 'booking_flat'
      );
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Flat
          <ChevronsUpDown
            className={cn(
              'size-4 text-muted-foreground',
              isColumnSorted && 'text-foreground'
            )}
          />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3">{row.getValue('booking_flat')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column, table }) => {
      const currentSorting = table.getState().sorting;
      const isColumnSorted = currentSorting.some(
        (sort) => sort.id === 'amount'
      );
      return (
        <div className="flex items-center justify-end">
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            variant="ghost"
          >
            Amount
            <ChevronsUpDown
              className={cn(
                'size-4 text-muted-foreground',
                isColumnSorted && 'text-foreground'
              )}
            />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-end pr-3 text-right font-medium">
        <IndianRupee className="size-3.5 text-muted-foreground" />
        {amountFormatter(row.getValue('amount'))}
      </div>
    ),
  },
  {
    accessorKey: 'booking_qty',
    header: ({ column, table }) => {
      const currentSorting = table.getState().sorting;
      const isColumnSorted = currentSorting.some(
        (sort) => sort.id === 'booking_qty'
      );
      return (
        <div className="flex items-center justify-end">
          <Button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            variant="ghost"
          >
            Mahaprasad Count
            <ChevronsUpDown
              className={cn(
                'size-4 text-muted-foreground',
                isColumnSorted && 'text-foreground'
              )}
            />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-end pr-3 text-right font-medium">
        {row.getValue('booking_qty')}
      </div>
    ),
  },
  {
    accessorKey: 'payment_mode',
    header: () => <div className="text-center">Mode</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Badge
          className="capitalize"
          variant={
            row.getValue('payment_mode') === 'cash' ? 'destructive' : 'default'
          }
        >
          {row.getValue('payment_mode')}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'receiver',
    header: ({ column, table }) => {
      const currentSorting = table.getState().sorting;
      const isColumnSorted = currentSorting.some(
        (sort) => sort.id === 'receiver'
      );
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Paid To
          <ChevronsUpDown
            className={cn(
              'size-4 text-muted-foreground',
              isColumnSorted && 'text-foreground'
            )}
          />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-3 capitalize">{row.getValue('receiver')}</div>
    ),
  },
];
