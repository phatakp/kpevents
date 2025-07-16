'use client';

import type { TBuilding, TCommittee, TEventType } from '@/app/types';
import { Amount } from '@/components/layouts/amount';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { collectionsByBuildingOptions } from '@/query-options/collections';
import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { DataTable } from './data-table';
import { NewCollectionBtn } from './new-collection-btn';

type Props = {
  building: TBuilding;
  type: TEventType;
  isMember: boolean;
  committee: TCommittee;
};

export function CollectionsCard({
  building,
  type,
  isMember,
  committee,
}: Props) {
  const { data: collections } = useQuery(
    collectionsByBuildingOptions(building, type)
  );

  const total = collections?.reduce((acc, b) => acc + b.amount, 0) ?? 0;

  const totalCount =
    collections?.reduce((acc, b) => acc + b.booking_qty, 0) ?? 0;

  return (
    <div className="w-full *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-secondary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="max-w-sm sm:max-w-md md:max-w-full ">
        <CardHeader>
          <CardDescription>
            Total Collection for {building} building
          </CardDescription>
          <CardTitle>
            <div className="flex items-center">
              <Amount amount={total} />
              {type === 'ganpati' && (
                <span className="ml-2 text-muted-foreground text-sm">
                  (Mahaprasad Count:{totalCount})
                </span>
              )}
            </div>
          </CardTitle>
          <CardAction>
            <NewCollectionBtn
              committee={committee}
              isMember={isMember}
              type={type}
            />
          </CardAction>
        </CardHeader>

        {collections && collections.length > 0 && (
          <CardContent className="p-0">
            <DataTable columns={columns} data={collections} />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
