import type { TCommittee, TEventType } from '@/app/types';
import {
  getAllEventsByCommittee,
  getAllEventsByType,
  getEventBySlug,
} from '@/server/actions/event.actions';
import { queryOptions } from '@tanstack/react-query';

export const eventKeys = {
  all: ['events'] as const,
  eventBySlug: (slug: string) => [...eventKeys.all, slug] as const,
  eventsByType: (type: TEventType) => [...eventKeys.all, type] as const,
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

export const eventBySlugOptions = (slug: string) =>
  queryOptions({
    queryKey: eventKeys.eventBySlug(slug),
    queryFn: () => getEventBySlug({ slug }).then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });

export const eventsByTypeOptions = (type: TEventType) =>
  queryOptions({
    queryKey: eventKeys.eventsByType(type),
    queryFn: () => getAllEventsByType({ type }).then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
  });
