'use client';

import { EventBookingFormSchema } from '@/app/schemas';
import type { TCommittee, TEventType } from '@/app/types';
import { useAuthContext } from '@/components/auth/auth-provider';
import { ReceiverInput } from '@/components/inputs/receiver-input';
import { SelectInput } from '@/components/inputs/select-input';
import { TextInput } from '@/components/inputs/text-input';
import { useModal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BUILDINGS, PAY_MODES, PAY_STATUS } from '@/lib/constants';
import { cn, customResolver } from '@/lib/utils';
import { collectionsKeys } from '@/query-options/collections';
import { addEventBooking } from '@/server/actions/booking.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  type: TEventType;
  committee: TCommittee;
};

export function EventBookingForm({ type, committee }: Props) {
  const queryClient = useQueryClient();
  const { modalId, closeModal } = useModal();
  const { profile } = useAuthContext();
  const router = useRouter();

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
          queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
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

        {type === 'ganpati' && (
          <TextInput
            label="Mahaprasad count"
            register={form.register('booking_qty')}
            type="number"
          />
        )}

        <ReceiverInput committee={committee} />

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
