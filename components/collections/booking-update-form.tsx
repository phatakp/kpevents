'use client';

import { EventBookingUpdateFormSchema } from '@/app/schemas';
import type { TBuilding, TEventBooking } from '@/app/types';
import { SelectInput } from '@/components/inputs/select-input';
import { TextInput } from '@/components/inputs/text-input';
import { useModal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BUILDINGS, PAY_MODES, PAY_STATUS } from '@/lib/constants';
import { cn, customResolver } from '@/lib/utils';
import { updateEventBooking } from '@/server/actions/booking.actions';
import { getAllCommitteeMembers } from '@/server/actions/committee.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { DeleteBookingBtn } from './delete-booking-btn';

type Props = {
  booking: TEventBooking;
};

export function BookingUpdateForm({ booking }: Props) {
  const router = useRouter();
  const { modalId, closeModal } = useModal();
  const { data: members } = useQuery({
    queryKey: ['members', booking.committee],
    queryFn: () =>
      getAllCommitteeMembers({ committee: booking.committee }).then(
        (res) => res.data
      ),
  });

  const memberOptions = (
    members?.map((m) => ({
      label: `${m.user.name} (${m.user.building}${m.user.flat})`,
      value: `${m.user.name} (${m.user.building}${m.user.flat})`,
    })) ?? []
  ).concat([{ label: 'Other', value: 'Other' }]);

  const psplit = booking.receiver?.split(' (');
  if (psplit?.length === 2) {
    const building = psplit[1].charAt(0) as TBuilding;
    const flat = Number(psplit[1].slice(1, -1));
    if (
      !(
        members?.map((m) => m.user.building).includes(building) &&
        members?.map((m) => m.user.flat).includes(flat)
      )
    ) {
      memberOptions.push({
        label: booking.receiver as string,
        value: booking.receiver as string,
      });
    }
  }

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

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6')}
        onSubmit={handleSubmitWithAction}
      >
        <TextInput label="Name" register={form.register('booking_name')} />
        <div className="flex gap-4">
          <SelectInput
            label="Building"
            options={buildingOptions}
            register={form.register('booking_building')}
          />
          <TextInput
            label="Flat"
            register={form.register('booking_flat')}
            type="number"
          />
        </div>
        <TextInput
          label="Amount"
          register={form.register('amount')}
          type="number"
        />

        {booking.event_slug.includes('ganpati') && (
          <TextInput
            label="Mahaprasad count"
            register={form.register('booking_qty')}
            type="number"
          />
        )}

        <SelectInput
          label="Received By"
          options={memberOptions}
          register={form.register('receiver')}
        />

        {receiver === 'Other' && (
          <>
            <TextInput
              label="Receiver"
              register={form.register('otherPaidTo')}
            />
            <div className="flex gap-4">
              <SelectInput
                label="Receiver Building"
                options={buildingOptions}
                register={form.register('otherBuilding')}
              />
              <TextInput
                label="Receiver Flat"
                register={form.register('otherFlat')}
                type="number"
              />
            </div>
          </>
        )}

        <div className="flex gap-4">
          <SelectInput
            label="Mode"
            options={modeOptions}
            register={form.register('payment_mode')}
          />
          <SelectInput
            label="Status"
            options={statusOptions}
            register={form.register('status')}
          />
        </div>

        <Button
          className="w-full"
          isLoading={form.formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
      <DeleteBookingBtn id={booking.id} />
    </Form>
  );
}
const buildingOptions = BUILDINGS.map((b) => ({ label: b, value: b }));
const statusOptions = PAY_STATUS.map((b) => ({ label: b, value: b }));
const modeOptions = PAY_MODES.map((b) => ({ label: b, value: b }));
