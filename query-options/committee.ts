import type { TCommittee } from '@/app/types';
import {
  getAllCommitteeMembers,
  isCommitteeMember,
} from '@/server/actions/committee.actions';
import { queryOptions } from '@tanstack/react-query';

export const committeeKeys = {
  all: ['members'] as const,
  committeeMembers: (committee: TCommittee) =>
    [...committeeKeys.all, committee] as const,
  isMember: (committee: TCommittee) =>
    [...committeeKeys.all, 'isMember', committee] as const,
};

export const committeeMemberOptions = (committee: TCommittee) =>
  queryOptions({
    queryKey: committeeKeys.committeeMembers(committee),
    queryFn: () =>
      getAllCommitteeMembers({ committee }).then((res) => res.data),
    enabled: !!committee,
    staleTime: 1000 * 60 * 60,
  });

export const isMemberOptions = (committee: TCommittee) =>
  queryOptions({
    queryKey: committeeKeys.isMember(committee),
    queryFn: () => isCommitteeMember({ committee }).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
