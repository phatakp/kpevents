import type { TCommittee } from '@/app/types';
import { getAllCommitteeMembers } from '@/server/actions/committee.actions';
import { queryOptions } from '@tanstack/react-query';

export const committeeMemberOptions = (committee: TCommittee) =>
  queryOptions({
    queryKey: ['members', committee],
    queryFn: () =>
      getAllCommitteeMembers({ committee }).then((res) => res.data),
    enabled: !!committee,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });
