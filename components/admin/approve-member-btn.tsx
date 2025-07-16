'use client';

import type { TCommittee } from '@/app/types';
import { approveMember } from '@/server/actions/committee.actions';
import { useQueryClient } from '@tanstack/react-query';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { committeeMemberOptions } from '../../query-options/committee';
import { Button } from '../ui/button';

type Props = {
  committeeName: TCommittee;
  userId: string;
};

export function ApproveMemberBtn({ committeeName, userId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { execute, isPending } = useAction(approveMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(committeeMemberOptions(committeeName));
      toast.success('Member approved');
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
    execute({
      committee: committeeName,
      member_id: userId,
    });
  }
  return (
    <Button isLoading={isPending} onClick={handleClick} size={'sm'}>
      Approve
    </Button>
  );
}
