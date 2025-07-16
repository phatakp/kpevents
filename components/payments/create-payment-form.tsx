'use client';

import { PaymentFormSchema } from '@/app/schemas';
import type { TCommittee } from '@/app/types';
import { useAuthContext } from '@/components/auth/auth-provider';
import { DateInput } from '@/components/inputs/date-input';
import { PaidByInput } from '@/components/inputs/paid-by-input';
import { TextInput } from '@/components/inputs/text-input';
import { useModal } from '@/components/layouts/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn, customResolver } from '@/lib/utils';
import { paymentKeys } from '@/query-options/payments';
import { addPayment } from '@/server/actions/booking.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  committee: TCommittee;
};

export function CreatePaymentForm({ committee }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { modalId, closeModal } = useModal();
  const { profile } = useAuthContext();

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

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-6')}
        onSubmit={handleSubmitWithAction}
      >
        <Badge className="capitalize">Paying from {committee} balance</Badge>
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
