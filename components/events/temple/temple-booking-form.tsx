'use client';
import { TempleBookingFormSchema } from '@/app/schemas';
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
import { templeKeys } from '@/query-options/temple';
import { createTempleBookings } from '@/server/actions/temple.actions';
import { useTempleCartStore } from '@/store/temple.cart.store';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Minus, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function TempleBookingForm() {
  const cart = useTempleCartStore((state) => state.cart);
  const cartActions = useTempleCartStore((state) => state.cartActions);
  const queryClient = useQueryClient();
  const { profile } = useAuthContext();
  const router = useRouter();
  const { closeModal, modalId } = useModal();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(
      createTempleBookings,
      customResolver(TempleBookingFormSchema),
      {
        formProps: {
          mode: 'onChange',
          defaultValues: {
            bookByName: '',
            receiver: '',
            building: 'A',
            flat: 0,
            otherPaidTo: '',
            otherBuilding: 'A',
            otherFlat: 0,
            bookings: cart?.items ?? [
              {
                itemName: '',
                totAmt: 0,
                bookAmt: 0,
              },
            ],
          },
        },
        actionProps: {
          onSuccess: ({ data }) => {
            if (data) toast.error(data);
            else {
              queryClient.invalidateQueries({ queryKey: templeKeys.all });
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
            queryClient.invalidateQueries({ queryKey: templeKeys.all });
            cartActions.reset();
            resetFormAndAction();
            closeModal(modalId);
            router.refresh();
          },
        },
      }
    );

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

  const totalAmount = cart.items.reduce((acc, b) => acc + b.bookAmt, 0);

  const incrementAmt = (itemName: string) => {
    cartActions.incrementAmt(itemName);
  };

  const decrementAmt = (itemName: string) => {
    cartActions.decrementAmt(itemName);

    if (cart.items.length === 0) {
      queryClient.invalidateQueries({ queryKey: templeKeys.all });
      cartActions.reset();
      closeModal(modalId);
      router.refresh();
    }
  };

  const removeItem = (itemName: string) => {
    cartActions.deleteFromCart(itemName);

    if (cart.items.length === 0) {
      queryClient.invalidateQueries({ queryKey: templeKeys.all });
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
        <ReceiverInput committee="temple" schema={TempleBookingFormSchema} />
        <Table className="max-w-screen">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Item Name</TableHead>
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
                      disabled={item.bookAmt === 0}
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
                      disabled={item.bookAmt === 0}
                      onClick={() => decrementAmt(item.itemName)}
                      size={'icon'}
                      type="button"
                      variant={'outline'}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="flex-1 text-center text-sm">
                      {item.bookAmt}
                    </span>
                    <Button
                      className="size-4 rounded-md p-0"
                      disabled={item.bookAmt === item.totAmt}
                      onClick={() => incrementAmt(item.itemName)}
                      size={'icon'}
                      type="button"
                      variant={'outline'}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
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
