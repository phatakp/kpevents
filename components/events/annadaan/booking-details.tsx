/** biome-ignore-all lint/complexity/noUselessFragments: <table row> */
'use client';
import type { TAnnadaanBooking, TBuilding } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { amountFormatter } from '@/lib/utils';
import { annadaanKeys } from '@/query-options/annadaan';
import { deleteBooking } from '@/server/actions/annadaan.actions';
import { useQueryClient } from '@tanstack/react-query';
import { IndianRupeeIcon, Trash } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = { bookings: TAnnadaanBooking[]; price: number; year: number };

export function BookingDetails({ bookings, price, year }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { profile, isLoading } = useAuthContext();
  const { execute } = useAction(deleteBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: annadaanKeys.all });
      toast.success('Booking deleted');
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        error?.validationErrors?.formErrors?.[0] ??
          error?.serverError ??
          error.thrownError?.message ??
          'Could not process request'
      );
    },
  });

  if (isLoading)
    return (
      <TableRow>
        <TableCell colSpan={5}>
          <Skeleton className="h-10 w-full" />
        </TableCell>
      </TableRow>
    );
  return (
    <>
      <TableRow>
        <TableCell colSpan={5}>
          <Table className="bg-secondary text-secondary-foreground">
            <TableHeader className="h-auto">
              <TableRow>
                {profile?.is_admin && <TableHead>Act</TableHead>}
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Flat</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b, i) => (
                <TableRow
                  className="border-border border-b text-muted-foreground text-sm"
                  key={`${b.item_name}${i}`}
                >
                  {profile?.is_admin && (
                    <TableCell>
                      <Button
                        onClick={() =>
                          execute({
                            item_name: b.item_name,
                            booking_building: b.booking_building as TBuilding,
                            booking_flat: b.booking_flat,
                            booking_name: b.booking_name,
                            year: Number(year),
                          })
                        }
                        size={'icon'}
                        variant={'ghost'}
                      >
                        <Trash className="size-4 text-destructive" />
                      </Button>
                    </TableCell>
                  )}
                  <TableCell className="py-1 font-medium">
                    {b.booking_name}
                  </TableCell>
                  <TableCell className="py-1">
                    {b.booking_building}-{b.booking_flat}
                  </TableCell>
                  <TableCell className="py-1 text-right">
                    {b.booking_qty}
                  </TableCell>
                  <TableCell className="py-1 text-right">
                    <div className="flex items-center justify-end">
                      <IndianRupeeIcon className="size-3 text-muted-foreground" />
                      {amountFormatter(b.booking_qty * price)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    </>
  );
}
