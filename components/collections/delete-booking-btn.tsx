'use client';

import { Button } from '@/components/ui/button';
import { collectionsKeys } from '@/query-options/collections';
import { deleteBooking } from '@/server/actions/booking.actions';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useModal } from '../layouts/modal';

type Props = {
  id: number;
  disabled?: boolean;
};

export function DeleteBookingBtn({ id, disabled }: Props) {
  const queryClient = useQueryClient();
  const { modalId, closeModal } = useModal();
  const router = useRouter();

  const { execute, isPending } = useAction(deleteBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: collectionsKeys.all });
      toast.success('Entry deleted successfully');
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
      className="my-4 w-full"
      disabled={disabled}
      isLoading={isPending}
      onClick={handleClick}
      variant={'destructive'}
    >
      <Trash2 className="size-4 " /> Delete Entry
    </Button>
  );
}
