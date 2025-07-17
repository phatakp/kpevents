'use client';

import { PaymentFormSchema } from '@/app/schemas';
import type { TCommittee } from '@/app/types';
import { DateInput } from '@/components/inputs/date-input';
import { PaidByInput } from '@/components/inputs/paid-by-input';
import { TextInput } from '@/components/inputs/text-input';
import { useModal } from '@/components/layouts/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { cn, customResolver } from '@/lib/utils';
import { allEventByCommitteeOptions } from '@/query-options/events';
import { paymentKeys } from '@/query-options/payments';
import { addPayment } from '@/server/actions/booking.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SelectInput } from '../inputs/select-input';

type Props = {
  committee: TCommittee;
};

export function CreatePaymentForm({ committee }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { modalId, closeModal } = useModal();
  const { profile } = useAuthContext();
  const { data: events, isLoading } = useQuery(
    allEventByCommitteeOptions(committee)
  );

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
          event_slug: '',
          date: new Date(), // Default to today
        },
      },

      actionProps: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: paymentKeys.all,
          });
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

  if (isLoading) return <Loader className="mx-auto animate-spin" />;
  const eventOptions = events?.map((e) => ({ label: e.slug, value: e.slug }));

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6')}
        onSubmit={handleSubmitWithAction}
      >
        <Badge className="capitalize">Paying from {committee} balance</Badge>
        <SelectInput
          label={'For Event'}
          options={eventOptions ?? []}
          register={form.register('event_slug')}
        />
        <DateInput label={'Date'} register={form.register('date')} />
        <TextInput label="Description" register={form.register('desc')} />

        <TextInput
          label="Amount"
          register={form.register('amount')}
          type="number"
        />

        <PaidByInput committee={committee} />

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
