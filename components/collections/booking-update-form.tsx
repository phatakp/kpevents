'use client';

import { EventBookingUpdateFormSchema } from '@/app/schemas';
import type { TEventBooking } from '@/app/types';
import { SelectInput } from '@/components/inputs/select-input';
import { TextInput } from '@/components/inputs/text-input';
import { useModal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BUILDINGS, PAY_MODES, PAY_STATUS } from '@/lib/constants';
import { cn, customResolver } from '@/lib/utils';
import { collectionsKeys } from '@/query-options/collections';
import { updateEventBooking } from '@/server/actions/booking.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ReceiverInput } from '../inputs/receiver-input';
import { Badge } from '../ui/badge';
import { DeleteBookingBtn } from './delete-booking-btn';

type Props = {
  booking: TEventBooking;
  isMember?: boolean;
};

export function BookingUpdateForm({ booking, isMember }: Props) {
  const queryClient = useQueryClient();
  const { modalId, closeModal } = useModal();
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(
      updateEventBooking,
      customResolver(EventBookingUpdateFormSchema),
      {
        formProps: {
          mode: 'onChange',
          defaultValues: {
            id: booking.id,
            committee: booking.committee,
            event_slug: booking.event_slug,
            amount: booking.amount,
            booking_building: booking.booking_building,
            booking_flat: booking.booking_flat,
            booking_name: booking.booking_name,
            booking_qty: booking.booking_qty,
            receiver: booking.receiver,
            status: booking.status,
            payment_mode: booking.payment_mode,
            otherPaidTo: '',
            otherBuilding: 'A',
            otherFlat: 0,
          },
        },

        actionProps: {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
            toast.success('Entry updated successfully');
            resetFormAndAction();
            closeModal(modalId);
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
        },
      }
    );
  const receiver = form.watch('receiver');
  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6')}
        onSubmit={handleSubmitWithAction}
      >
        {!isMember && <Badge>You are not authorized to edit details</Badge>}
        <TextInput
          disabled={!isMember}
          label="Name"
          register={form.register('booking_name')}
        />
        <div className="flex gap-4">
          <SelectInput
            disabled={!isMember}
            label="Building"
            options={buildingOptions}
            register={form.register('booking_building')}
          />
          <TextInput
            disabled={!isMember}
            label="Flat"
            register={form.register('booking_flat')}
            type="number"
          />
        </div>
        <TextInput
          disabled={!isMember}
          label="Amount"
          register={form.register('amount')}
          type="number"
        />

        {booking.event_slug.includes('ganpati') && (
          <TextInput
            disabled={!isMember}
            label="Mahaprasad count"
            register={form.register('booking_qty')}
            type="number"
          />
        )}

        <ReceiverInput
          bookingReceiver={receiver as string}
          committee={booking.committee}
          disabled={!isMember}
          schema={EventBookingUpdateFormSchema}
        />

        <div className="flex gap-4">
          <SelectInput
            disabled={!isMember}
            label="Mode"
            options={modeOptions}
            register={form.register('payment_mode')}
          />
          <SelectInput
            disabled={!isMember}
            label="Status"
            options={statusOptions}
            register={form.register('status')}
          />
        </div>

        <Button
          className="w-full"
          disabled={!isMember}
          isLoading={form.formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
      <DeleteBookingBtn disabled={!isMember} id={booking.id} />
    </Form>
  );
}
const buildingOptions = BUILDINGS.map((b) => ({ label: b, value: b }));
const statusOptions = PAY_STATUS.map((b) => ({ label: b, value: b }));
const modeOptions = PAY_MODES.map((b) => ({ label: b, value: b }));
