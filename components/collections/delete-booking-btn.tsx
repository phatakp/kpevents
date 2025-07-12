'use client';

import { Button } from '@/components/ui/button';
import { deleteBooking } from '@/server/actions/booking.actions';
import { Trash2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  id: number;
};

export function DeleteBookingBtn({ id }: Props) {
  const router = useRouter();

  const { execute, isPending } = useAction(deleteBooking, {
    onSuccess: () => {
      toast.success('Entry deleted successfully');
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
      className="p-0"
      isLoading={isPending}
      onClick={handleClick}
      size={'icon'}
      variant={'ghost'}
    >
      <Trash2 className="size-4 text-destructive" />
    </Button>
  );
}
