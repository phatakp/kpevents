'use client';

import { useModal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import { paymentKeys } from '@/query-options/payments';
import { deletePayment } from '@/server/actions/payment.actions';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  id: number;
  disabled?: boolean;
};

export function DeletePaymentBtn({ id, disabled }: Props) {
  const router = useRouter();
  const { modalId, closeModal } = useModal();
  const queryClient = useQueryClient();

  const { execute, isPending } = useAction(deletePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: paymentKeys.all,
      });
      toast.success('Payment deleted successfully');
      closeModal(modalId);
      router.refresh();
    },
    onError: ({ error }) =>
      toast.error(
        error?.validationErrors?.formErrors?.[0] ??
          error?.serverError ??
          error.thrownError?.message ??
          'Could not process request'
      ),
  });

  function handleClick() {
    execute({ id });
  }

  return (
    <Button
      className="mt-4 w-full"
      disabled={disabled}
      isLoading={isPending}
      onClick={handleClick}
      variant={'destructive'}
    >
      <Trash2 className="size-4 text-destructive" />
      Delete Payment
    </Button>
  );
}
