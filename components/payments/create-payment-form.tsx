'use client';

import { PaymentFormSchema } from '@/app/schemas';
import type { TCommittee } from '@/app/types';
import { BUILDINGS } from '@/lib/constants';
import { cn, customResolver } from '@/lib/utils';
import { addPayment } from '@/server/actions/booking.actions';
import { getAllCommitteeMembers } from '@/server/actions/committee.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthContext } from '../auth/auth-provider';
import { SelectInput } from '../inputs/select-input';
import { TextInput } from '../inputs/text-input';
import { useModal } from '../layouts/modal';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

type Props = {
  committee: TCommittee;
};

export function CreatePaymentForm({ committee }: Props) {
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
    useHookFormAction(addPayment, customResolver(PaymentFormSchema), {
      formProps: {
        mode: 'onChange',
        defaultValues: {
          committee,
          amount: 0,
          desc: '',
          paid_by: `${profile?.name} (${profile?.building}${profile?.flat})`,
          otherPaidTo: '',
          otherBuilding: 'A',
          otherFlat: 0,
        },
      },

      actionProps: {
        onSuccess: () => {
          toast.success('Payment created successfully');
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

  const paidBy = form.watch('paid_by');

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6')}
        onSubmit={handleSubmitWithAction}
      >
        <Badge className="capitalize">Paying from {committee} balance</Badge>
        <TextInput label="Description" register={form.register('desc')} />

        <TextInput
          label="Amount"
          register={form.register('amount')}
          type="number"
        />

        <SelectInput
          label="Paid By"
          options={memberOptions}
          register={form.register('paid_by')}
        />

        {paidBy === 'Other' && (
          <>
            <TextInput
              label="Other Sender"
              register={form.register('otherPaidTo')}
            />
            <div className="flex gap-4">
              <SelectInput
                label="Sender Building"
                options={buildingOptions}
                register={form.register('otherBuilding')}
              />
              <TextInput
                label="Sender Flat"
                register={form.register('otherFlat')}
                type="number"
              />
            </div>
          </>
        )}

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
