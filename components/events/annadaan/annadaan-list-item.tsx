'use client';

import type { TBuilding, TItemWithBookings } from '@/app/types';
import { Amount } from '@/components/layouts/amount';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { cn } from '@/lib/utils';
import { annadaanKeys } from '@/query-options/annadaan';
import { deleteBooking } from '@/server/actions/annadaan.actions';
import { useAnnadaanCartStore } from '@/store';
import { useQueryClient } from '@tanstack/react-query';
import { ShoppingCartIcon, Trash2Icon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  item: TItemWithBookings;
  isEventActive: boolean;
  year: number;
  available?: boolean;
};

export function AnnadaanListItem({
  item,
  isEventActive,
  year,
  available,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const cart = useAnnadaanCartStore((state) => state.cart);
  const { profile } = useAuthContext();
  const availableQty =
    item.quantity -
    item.bookings.reduce((acc, b) => acc + b.booking_qty, 0) -
    (cart.items.find((c) => c.itemName === item.item_name)?.bookQty ?? 0);

  const isAvailable = availableQty > 0;

  const addToCart = useAnnadaanCartStore(
    (state) => state.cartActions.addToCart
  );
  function handleClick() {
    addToCart({
      itemName: item.item_name,
      bookQty: availableQty,
      totQty: availableQty,
      price: item.price,
    });
    toast.success('Item added to cart');
  }

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

  if (!available)
    return item.bookings.map((b, i) => (
      <TableRow key={`${b.item_name}${i}`}>
        {isEventActive && profile?.is_admin && (
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
              <Trash2Icon className="size-4 text-destructive" />
            </Button>
          </TableCell>
        )}
        <TableCell className="w-[80px]">
          <div className="flex flex-col truncate">
            <span className=" text-sm">{b.item_name}</span>

            <div className="flex items-center text-primary text-sm md:hidden">
              <span className="text-muted-foreground text-xs">
                {b.booking_qty} * {b.booking_name} ({b.booking_building}
                {b.booking_flat})
              </span>
            </div>
          </div>
        </TableCell>

        <TableCell className="hidden text-sm md:table-cell">
          {b.booking_name} ({b.booking_building}
          {b.booking_flat})
        </TableCell>

        <TableCell className="hidden text-right md:table-cell">
          {b.booking_qty}
        </TableCell>

        <TableCell className="text-right">
          <Amount amount={b.amount} className="font-normal text-sm" />
        </TableCell>
      </TableRow>
    ));

  return (
    <TableRow>
      {isEventActive && (
        <TableCell>
          {isAvailable && (
            <Button
              className="rounded-sm"
              onClick={handleClick}
              size={'icon'}
              variant={'ghost'}
            >
              <ShoppingCartIcon
                className={cn(
                  'size-4 text-amber-600',
                  availableQty === item.quantity && 'text-success'
                )}
              />
            </Button>
          )}
        </TableCell>
      )}
      <TableCell className="w-[80px]">
        <div className="flex flex-col truncate">
          <span className=" text-sm">{item.item_name}</span>
          {isAvailable && (
            <span
              className={cn(
                'text-muted-foreground text-xs md:hidden',
                isEventActive && 'text-primary'
              )}
            >
              Available Qty: {availableQty}
            </span>
          )}
        </div>
      </TableCell>

      <TableCell className="hidden text-right md:table-cell">
        {availableQty}
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end">
          <Amount amount={item.price} className="font-normal text-sm" />
        </div>
      </TableCell>
    </TableRow>
  );
}
