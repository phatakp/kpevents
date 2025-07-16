import type { TBuilding, TCommittee, TEventType } from '@/app/types';
import { getQueryClient } from '@/lib/react-query/get-query-client';
import { isCommitteeMember } from '@/server/actions/committee.actions';
import { collectionsByBuildingOptions } from '../../query-options/collections';
import { CollectionsCard } from './collections-card';

type Props = {
  building: TBuilding;
  type: TEventType;
  committee: TCommittee;
};

export async function Collections({ building, type, committee }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(collectionsByBuildingOptions(building, type));
  const { data: isMember } = await isCommitteeMember({ committee });

  return (
    <CollectionsCard
      building={building}
      committee={committee}
      isMember={!!isMember}
      type={type}
    />
  );
}
