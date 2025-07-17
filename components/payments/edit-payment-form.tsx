'use client';

import { PaymentUpdateFormSchema } from '@/app/schemas';
import type { TPayment } from '@/app/types';
import { DateInput } from '@/components/inputs/date-input';
import { PaidByInput } from '@/components/inputs/paid-by-input';
import { TextInput } from '@/components/inputs/text-input';
import { useModal } from '@/components/layouts/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn, customResolver } from '@/lib/utils';
import { allEventByCommitteeOptions } from '@/query-options/events';
import { paymentKeys } from '@/query-options/payments';
import { updatePayment } from '@/server/actions/payment.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SelectInput } from '../inputs/select-input';
import { DeletePaymentBtn } from './delete-payment-btn';

type Props = {
  payment: TPayment;
  isMember: boolean;
};

export function EditPaymentForm({ payment, isMember }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { modalId, closeModal } = useModal();
  const { data: events, isLoading } = useQuery(
    allEventByCommitteeOptions(payment.committee)
  );

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
          event_slug: payment.event_slug,
          otherPaidTo: '',
          otherBuilding: 'A',
          otherFlat: 0,
          date: new Date(payment.date),
        },
      },

      actionProps: {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: paymentKeys.all });
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

  if (isLoading) return <Loader className="mx-auto animate-spin" />;
  const eventOptions = events?.map((e) => ({ label: e.slug, value: e.slug }));
  const paidBy = form.watch('paid_by');

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6')}
        onSubmit={handleSubmitWithAction}
      >
        <Badge className="capitalize">
          {isMember
            ? `Paying from ${payment.committee} balance`
            : 'You are not authorized to edit details'}
        </Badge>
        <SelectInput
          label={'For Event'}
          options={eventOptions ?? []}
          register={form.register('event_slug')}
        />
        <DateInput
          disabled={!isMember}
          label={'Date'}
          register={form.register('date')}
        />
        <TextInput
          disabled={!isMember}
          label="Description"
          register={form.register('desc')}
        />

        <TextInput
          disabled={!isMember}
          label="Amount"
          register={form.register('amount')}
          type="number"
        />

        <PaidByInput
          committee={payment.committee}
          disabled={!isMember}
          otherSender={paidBy as string}
        />

        <Button
          className="w-full"
          disabled={!isMember}
          isLoading={form.formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
      <DeletePaymentBtn disabled={!isMember} id={payment.id} />
    </Form>
  );
}
