'use client';

import { EventBookingFormSchema } from '@/app/schemas';
import type { TCommittee, TEventType } from '@/app/types';
import { useAuthContext } from '@/components/auth/auth-provider';
import { SelectInput } from '@/components/inputs/select-input';
import { TextInput } from '@/components/inputs/text-input';
import { useModal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BUILDINGS, PAY_MODES, PAY_STATUS } from '@/lib/constants';
import { cn, customResolver } from '@/lib/utils';
import { addEventBooking } from '@/server/actions/booking.actions';
import { getAllCommitteeMembers } from '@/server/actions/committee.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = { type: TEventType; committee: TCommittee };

export function EventBookingForm({ type, committee }: Props) {
  const router = useRouter();
  const { modalId, closeModal } = useModal();
  const { profile } = useAuthContext();
  const { data: members } = useQuery({
    queryKey: ['members', committee],
    queryFn: () =>
      getAllCommitteeMembers({ committee }).then((res) => res.data),
  });

  const memberOptions = (
    members?.map((m) => ({
      label: `${m.user.name} (${m.user.building}${m.user.flat})`,
      value: `${m.user.name} (${m.user.building}${m.user.flat})`,
    })) ?? []
  ).concat([{ label: 'Other', value: 'Other' }]);

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(addEventBooking, customResolver(EventBookingFormSchema), {
      formProps: {
        mode: 'onChange',
        defaultValues: {
          committee,
          event_slug: `${type}-${new Date().getFullYear()}`,
          amount: 0,
          booking_building: 'A',
          booking_flat: 0,
          booking_name: '',
          booking_qty: 1,
          receiver: `${profile?.name} (${profile?.building}${profile?.flat})`,
          status: 'confirmed',
          payment_mode: 'online',
          otherPaidTo: '',
          otherBuilding: 'A',
          otherFlat: 0,
        },
      },

      actionProps: {
        onSuccess: () => {
          toast.success('Entry created successfully');
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
    });

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
    </Form>
  );
}
const buildingOptions = BUILDINGS.map((b) => ({ label: b, value: b }));
const statusOptions = PAY_STATUS.map((b) => ({ label: b, value: b }));
const modeOptions = PAY_MODES.map((b) => ({ label: b, value: b }));
