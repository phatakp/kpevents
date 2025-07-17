'use client';
import { BookingFormSchema } from '@/app/schemas';
import type { TBuilding } from '@/app/types';
import { ReceiverInput } from '@/components/inputs/receiver-input';
import { SelectInput } from '@/components/inputs/select-input';
import { TextInput } from '@/components/inputs/text-input';
import { Amount } from '@/components/layouts/amount';
import { useModal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BUILDINGS } from '@/lib/constants';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { customResolver } from '@/lib/utils';
import { annadaanKeys } from '@/query-options/annadaan';
import { createBookings } from '@/server/actions/annadaan.actions';
import { useAnnadaanCartStore } from '@/store';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Minus, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function AnnadaanBookingForm() {
  const cart = useAnnadaanCartStore((state) => state.cart);
  const cartActions = useAnnadaanCartStore((state) => state.cartActions);
  const queryClient = useQueryClient();
  const { profile } = useAuthContext();
  const router = useRouter();
  const { closeModal, modalId } = useModal();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(createBookings, customResolver(BookingFormSchema), {
      formProps: {
        mode: 'onChange',
        defaultValues: {
          bookByName: '',
          receiver: '',
          building: 'A',
          flat: 0,
          year: new Date().getFullYear(),
          otherPaidTo: '',
          otherBuilding: 'A',
          otherFlat: 0,
          bookings: cart?.items ?? [
            {
              itemName: '',
              totQty: 0,
              bookQty: 0,
              price: 0,
            },
          ],
        },
      },
      actionProps: {
        onSuccess: ({ data }) => {
          if (data) toast.error(data);
          else {
            queryClient.invalidateQueries({ queryKey: annadaanKeys.all });
            toast.success('Items booked successfully');
            cartActions.reset();
            resetFormAndAction();
            closeModal(modalId);
            router.refresh();
          }
        },
        onError: ({ error }) => {
          toast.error(
            error?.validationErrors?.formErrors?.[0] ??
              error?.serverError ??
              error.thrownError?.message ??
              'Could not process request'
          );
          queryClient.invalidateQueries({ queryKey: annadaanKeys.all });
          cartActions.reset();
          resetFormAndAction();
          closeModal(modalId);
          router.refresh();
        },
      },
    });

  useEffect(() => {
    if (profile) {
      form.setValue('bookByName', profile.name);
      form.setValue('building', profile.building as TBuilding);
      form.setValue('flat', profile.flat as number);
    }
  }, [profile, form.setValue]);

  useEffect(() => {
    form.setValue('bookings', cart.items);
  }, [cart.items, form.setValue]);

  const totalAmount = cart.items.reduce(
    (acc, b) => acc + b.bookQty * b.price,
    0
  );

  const incrementQty = (itemName: string) => {
    cartActions.incrementQty(itemName);
  };

  const decrementQty = (itemName: string) => {
    cartActions.decrementQty(itemName);

    if (cart.items.length === 0) {
      queryClient.invalidateQueries({ queryKey: annadaanKeys.all });
      cartActions.reset();
      closeModal(modalId);
      router.refresh();
    }
  };

  const removeItem = (itemName: string) => {
    cartActions.deleteFromCart(itemName);

    if (cart.items.length === 0) {
      queryClient.invalidateQueries({ queryKey: annadaanKeys.all });
      cartActions.reset();
      closeModal(modalId);
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitWithAction}>
        {!profile && (
          <>
            <TextInput label="Name" register={form.register('bookByName')} />

            <div className="flex gap-4">
              <SelectInput
                label="Building"
                options={buildingOptions}
                register={form.register('building')}
              />
              <TextInput
                label="Flat"
                register={form.register('flat')}
                showClear={false}
                type="number"
              />
            </div>
          </>
        )}
        <ReceiverInput committee="cultural" schema={BookingFormSchema} />
        <Table className="max-w-screen">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Item Name</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow className="text-sm" key={item.itemName}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      className="size-4 rounded-md p-0"
                      disabled={item.bookQty === 0}
                      onClick={() => removeItem(item.itemName)}
                      size={'icon'}
                      type="button"
                      variant={'ghost'}
                    >
                      <Trash className="size-4 text-destructive" />
                    </Button>
                    <span>{item.itemName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      className="size-4 rounded-md p-0"
                      disabled={item.bookQty === 0}
                      onClick={() => decrementQty(item.itemName)}
                      size={'icon'}
                      type="button"
                      variant={'outline'}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="flex-1 text-center text-sm">
                      {item.bookQty}
                    </span>
                    <Button
                      className="size-4 rounded-md p-0"
                      disabled={item.bookQty === item.totQty}
                      onClick={() => incrementQty(item.itemName)}
                      size={'icon'}
                      type="button"
                      variant={'outline'}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Amount
                    amount={item.bookQty * item.price}
                    className="text-sm"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                <Amount amount={totalAmount} className="text-base" />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

const buildingOptions = BUILDINGS.map((b) => ({ label: b, value: b }));
