import type { TCommittee } from '@/app/types';
import { getAllEventsByCommittee } from '@/server/actions/event.actions';
import { queryOptions } from '@tanstack/react-query';

export const eventKeys = {
  all: ['events'] as const,
  getEventsByCommitteeOptions: (committee: TCommittee) =>
    [...eventKeys.all, committee] as const,
};

export const allEventByCommitteeOptions = (committee: TCommittee) =>
  queryOptions({
    queryKey: eventKeys.getEventsByCommitteeOptions(committee),
    queryFn: () =>
      getAllEventsByCommittee({ committee }).then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });
