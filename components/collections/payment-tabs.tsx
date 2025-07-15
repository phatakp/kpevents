import type { TCommittee, TEventType } from '@/app/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TotalCollections } from '../events/total-collections';
import { Payments } from '../payments/payments';
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
          <div className="mt-4">Only members can view collections.</div>
        )}
      </TabsContent>
      <TabsContent value="payments">
        {isMember ? (
          <Payments committee={committee} />
        ) : (
          <div className="mt-4">Only members can view payments.</div>
        )}
      </TabsContent>
    </Tabs>
  );
}
