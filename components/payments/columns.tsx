'use client';

import type { TPayment } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { amountFormatter, cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ChevronsUpDown, IndianRupee } from 'lucide-react';

export const columns: ColumnDef<TPayment>[] = [
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
    accessorKey: 'desc',
    header: ({ column, table }) => {
      const currentSorting = table.getState().sorting;
      const isColumnSorted = currentSorting.some((sort) => sort.id === 'desc');
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Description
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
      <div className="pl-3 capitalize">{row.getValue('desc')}</div>
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
    accessorKey: 'paid_by',
    header: ({ column, table }) => {
      const currentSorting = table.getState().sorting;
      const isColumnSorted = currentSorting.some(
        (sort) => sort.id === 'paid_by'
      );
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Paid By
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
      <div className="pl-3 capitalize">{row.getValue('paid_by')}</div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column, table }) => {
      const currentSorting = table.getState().sorting;
      const isColumnSorted = currentSorting.some((sort) => sort.id === 'date');
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Date
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
      <div className="pl-3 ">
        {format(new Date(row.getValue('date')), 'PPP')}
      </div>
    ),
  },
];
