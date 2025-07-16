'use client';

import type { TCommittee } from '@/app/types';
import { Button } from '@/components/ui/button';
import { committeeKeys } from '@/query-options/committee';
import { addMember } from '@/server/actions/committee.actions';
import { useQueryClient } from '@tanstack/react-query';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type Props = {
  committee: TCommittee;
  userId: string;
};

export function JoinCommitteeBtn({ committee, userId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { execute, isPending } = useAction(addMember, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: committeeKeys.all });
      toast.success('Membership Request Sent');
      router.push('/');
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
    execute({
      committee,
      member_id: userId,
    });
  }

  return (
    <Button
      className="rounded-full"
      isLoading={isPending}
      onClick={handleClick}
      size={'sm'}
    >
      Become a Member
    </Button>
  );
}
