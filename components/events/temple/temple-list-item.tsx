'use client';

import type { TReqWithBookings } from '@/app/types';
import { Amount } from '@/components/layouts/amount';
import { Button } from '@/components/ui/button';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useTempleCartStore } from '@/store/temple.cart.store';
import { ChevronDown, Dot, Minus, ShoppingCartIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { TempleBookingDetails } from './booking-details';

type Props = {
  item: TReqWithBookings;
  isEventActive: boolean;
};

export function TempleListItem({ item, isEventActive }: Props) {
  const cart = useTempleCartStore((state) => state.cart);
  const availableAmt =
    item.amount -
    item.bookings.reduce((acc, b) => acc + b.booking_amount, 0) -
    (cart.items.find((c) => c.itemName === item.item_name)?.bookAmt ?? 0);

  const isAvailable = availableAmt > 0;

  const addToCart = useTempleCartStore((state) => state.cartActions.addToCart);
  function handleClick() {
    addToCart({
      itemName: item.item_name,
      bookAmt: availableAmt,
      totAmt: availableAmt,
    });
    toast.success('Item added to cart');
  }

  return (
    <>
      <CollapsibleTrigger asChild>
        <TableRow>
          {isEventActive && (
            <TableCell>
              {isAvailable ? (
                <Button
                  className="rounded-sm"
                  onClick={handleClick}
                  size={'icon'}
                  variant={'ghost'}
                >
                  <ShoppingCartIcon
                    className={cn(
                      'size-4 text-amber-600',
                      availableAmt === item.amount && 'text-success'
                    )}
                  />
                </Button>
              ) : (
                <Button
                  className="rounded-sm"
                  disabled
                  size={'icon'}
                  variant={'ghost'}
                >
                  <Minus className={cn('size-4 text-muted-foreground')} />
                </Button>
              )}
            </TableCell>
          )}
          <TableCell className="w-[80px]">{item.item_name}</TableCell>

          <TableCell className="text-right">
            <div className="flex items-center justify-end">
              <Amount
                amount={availableAmt > 0 ? availableAmt : item.amount}
                className="font-normal text-sm"
              />
              {item?.bookings?.length ? (
                <ChevronDown className="size-3 text-muted-foreground" />
              ) : (
                <Dot className="size-3 text-muted-foreground" />
              )}
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleTrigger>
      {item.bookings.length > 0 && (
        <CollapsibleContent asChild>
          <TempleBookingDetails bookings={item.bookings} />
        </CollapsibleContent>
      )}
    </>
  );
}
