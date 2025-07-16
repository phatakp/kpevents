import type { TCommittee } from '@/app/types';
import { getAllPayments } from '@/server/actions/booking.actions';
import { queryOptions } from '@tanstack/react-query';

export const paymentKeys = {
  all: ['payments'] as const,
  committeePayments: (committee: TCommittee) =>
    [...paymentKeys.all, committee] as const,
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
