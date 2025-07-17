'use client';

import type { TItemWithBookings } from '@/app/types';
import { Amount } from '@/components/layouts/amount';
import { Button } from '@/components/ui/button';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useAnnadaanCartStore } from '@/store';
import { ChevronDown, Dot, ShoppingCartIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { BookingDetails } from './booking-details';

type Props = {
  item: TItemWithBookings;
  isEventActive: boolean;
  year: number;
};

export function AnnadaanListItem({ item, isEventActive, year }: Props) {
  const cart = useAnnadaanCartStore((state) => state.cart);
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

  return (
    <>
      <CollapsibleTrigger asChild>
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
              {isAvailable && isEventActive && (
                <span className="text-primary text-sm md:hidden">
                  Available Qty: {availableQty}
                </span>
              )}
            </div>
          </TableCell>
          {isEventActive && (
            <TableCell className="hidden text-right md:table-cell">
              {availableQty}
            </TableCell>
          )}
          <TableCell className="text-right">
            <div className="flex items-center justify-end">
              <Amount amount={item.price} className="font-normal text-sm" />
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
          <BookingDetails
            bookings={item.bookings}
            price={item.price}
            year={year}
          />
        </CollapsibleContent>
      )}
    </>
  );
}
