import type { TCommittee, TEventType } from '@/app/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TotalCollections } from '../events/total-collections';
import { Payments } from '../payments/payments';
import { Badge } from '../ui/badge';
import { BuildingTabs } from './building-tabs';

type Props = {
  type: TEventType;
  year: number;
  committee: TCommittee;
  isMember?: boolean;
};

export function PaymentTabs({ type, year, committee, isMember }: Props) {
  return (
    <Tabs className="w-[400px] sm:w-full" defaultValue="collections">
      <TabsList>
        <TabsTrigger value="collections">Collections</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
      </TabsList>
      <TabsContent value="collections">
        <TotalCollections type={type} year={year} />
        {isMember ? (
          <div className="mt-4 grid gap-2">
            Choose the building
            <BuildingTabs committee={committee} type={type} />
          </div>
        ) : (
          <Badge className="mt-4 ">
            Only members can view collection details.
          </Badge>
        )}
      </TabsContent>
      <TabsContent value="payments">
        <Payments committee={committee} />
      </TabsContent>
    </Tabs>
  );
}
