'use client';

import { AnnadaanBookingForm } from '@/components/events/annadaan/annadaan-booking-form';
import { TempleBookingForm } from '@/components/events/temple/temple-booking-form';
import { Modal } from '@/components/layouts/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAnnadaanCartStore } from '@/store';
import { useTempleCartStore } from '@/store/temple.cart.store';
import { ShoppingCartIcon } from 'lucide-react';

export function Cart() {
  const cart = useAnnadaanCartStore((state) => state.cart);
  const tcart = useTempleCartStore((state) => state.cart);
  if (cart.items.length === 0 && tcart.items.length === 0) return;

  return (
    <Modal
      content={
        cart.items.length > 0 ? <AnnadaanBookingForm /> : <TempleBookingForm />
      }
      description="Change the quantity as per your wish"
      title="Your cart items"
    >
      <Button size={'icon'} variant={'ghost'}>
        <ShoppingCartIcon className="size-4 text-muted-foreground" />
        <Badge>
          {cart.items.length > 0 ? cart.items.length : tcart.items.length}
        </Badge>
      </Button>
    </Modal>
  );
}
