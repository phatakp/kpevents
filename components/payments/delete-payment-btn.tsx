'use client';

import { Button } from '@/components/ui/button';
import { deletePayment } from '@/server/actions/booking.actions';
import { Trash2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useModal } from '../layouts/modal';

type Props = {
  id: number;
};

export function DeletePaymentBtn({ id }: Props) {
  const router = useRouter();
  const { modalId, closeModal } = useModal();

  const { execute, isPending } = useAction(deletePayment, {
    onSuccess: () => {
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
      isLoading={isPending}
      onClick={handleClick}
      variant={'destructive'}
    >
      <Trash2 className="size-4 text-destructive" />
      Delete Payment
    </Button>
  );
}
