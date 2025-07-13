'use client';

import { PaymentUpdateFormSchema } from '@/app/schemas';
import type { TBuilding, TPayment } from '@/app/types';
import { BUILDINGS } from '@/lib/constants';
import { cn, customResolver } from '@/lib/utils';
import { updatePayment } from '@/server/actions/booking.actions';
import { getAllCommitteeMembers } from '@/server/actions/committee.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { DateInput } from '../inputs/date-input';
import { SelectInput } from '../inputs/select-input';
import { TextInput } from '../inputs/text-input';
import { useModal } from '../layouts/modal';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { DeletePaymentBtn } from './delete-payment-btn';

type Props = {
  payment: TPayment;
};

export function EditPaymentForm({ payment }: Props) {
  const router = useRouter();
  const { modalId, closeModal } = useModal();
  const { data: members } = useQuery({
    queryKey: ['members', payment.committee],
    queryFn: () =>
      getAllCommitteeMembers({ committee: payment.committee }).then(
        (res) => res.data
      ),
  });

  const memberOptions = (
    members?.map((m) => ({
      label: `${m.user.name} (${m.user.building}${m.user.flat})`,
      value: `${m.user.name} (${m.user.building}${m.user.flat})`,
    })) ?? []
  ).concat([{ label: 'Other', value: 'Other' }]);

  const psplit = payment.paid_by?.split(' (');
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
        label: payment.paid_by as string,
        value: payment.paid_by as string,
      });
    }
  }

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updatePayment, customResolver(PaymentUpdateFormSchema), {
      formProps: {
        mode: 'onChange',
        defaultValues: {
          id: payment.id,
          committee: payment.committee,
          amount: payment.amount,
          desc: payment.desc,
          paid_by: payment.paid_by,
          otherPaidTo: '',
          otherBuilding: 'A',
          otherFlat: 0,
          date: payment.date,
        },
      },

      actionProps: {
        onSuccess: () => {
          toast.success('Payment updated successfully');
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
        <Badge className="capitalize">
          Paying from {payment.committee} balance
        </Badge>
        <DateInput label={'Date'} register={form.register('date')} />
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
      <DeletePaymentBtn id={payment.id} />
    </Form>
  );
}

const buildingOptions = BUILDINGS.map((b) => ({ label: b, value: b }));
