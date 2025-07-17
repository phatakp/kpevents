import type { TCommittee } from '@/app/types';
import {
  getAllPayments,
  getTotalPaymentsBySlug,
} from '@/server/actions/payment.actions';
import { queryOptions } from '@tanstack/react-query';

export const paymentKeys = {
  all: ['payments'] as const,
  committeePayments: (committee: TCommittee) =>
    [...paymentKeys.all, committee] as const,
  slugPayments: (slug: string) => [...paymentKeys.all, slug] as const,
};

export const allPaymentOptions = (committee: TCommittee) =>
  queryOptions({
    queryKey: paymentKeys.committeePayments(committee),
    queryFn: () =>
      getAllPayments({
        committee,
      }).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });

export const allPaymentBySlugOptions = (slug: string) =>
  queryOptions({
    queryKey: paymentKeys.slugPayments(slug),
    queryFn: () =>
      getTotalPaymentsBySlug({
        slug,
      }).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
