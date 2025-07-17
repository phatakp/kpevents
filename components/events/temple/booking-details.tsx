/** biome-ignore-all lint/complexity/noUselessFragments: <table row> */
'use client';
import type { TBuilding, TempleBooking } from '@/app/types';
import { Amount } from '@/components/layouts/amount';
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
import { templeKeys } from '@/query-options/temple';
import { deleteTempleBooking } from '@/server/actions/temple.actions';
import { useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = { bookings: TempleBooking[] };

export function TempleBookingDetails({ bookings }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { profile, isLoading } = useAuthContext();
  const { execute } = useAction(deleteTempleBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templeKeys.all });
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
        <TableCell colSpan={4}>
          <Skeleton className="h-10 w-full" />
        </TableCell>
      </TableRow>
    );
  return (
    <>
      <TableRow>
        <TableCell colSpan={4}>
          <Table className="bg-muted text-muted-foreground">
            <TableHeader className="h-auto">
              <TableRow>
                {profile?.is_admin && <TableHead>Act</TableHead>}
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Flat</TableHead>
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
                    <Amount amount={b.booking_amount} className="text-sm" />
                  </TableCell>
                </TableRow>
              ))}
              <>
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className="flex justify-center">
                      Booking details for {bookings.at(0)?.item_name}.
                    </div>
                  </TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    </>
  );
}
