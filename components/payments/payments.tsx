import type { TCommittee } from '@/app/types';
import { getQueryClient } from '@/lib/react-query/get-query-client';
import { allPaymentOptions } from '@/query-options/payments';
import { isCommitteeMember } from '@/server/actions/committee.actions';
import { PaymentsCard } from './payments-card';

type Props = {
  committee: TCommittee;
};

export async function Payments({ committee }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(allPaymentOptions(committee));
  const { data: isMember } = await isCommitteeMember({ committee });

  return <PaymentsCard committee={committee} isMember={!!isMember} />;
}
