import type { TCommittee, TEventType } from '@/app/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsGrid } from '../events/stats-grid';
import { Payments } from '../payments/payments';
import { BuildingTabs } from './building-tabs';

type Props = {
  type: TEventType;
  year: number;
  committee: TCommittee;
};

export function PaymentTabs({ type, year, committee }: Props) {
  return (
    <Tabs className="w-[400px] sm:w-full" defaultValue={'collections'}>
      <TabsList>
        <TabsTrigger value="collections">Collections</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
      </TabsList>
      <TabsContent value="collections">
        <StatsGrid type={type} year={year} />
        <div className="grid gap-2">
          Choose the building
          <BuildingTabs committee={committee} type={type} />
        </div>
      </TabsContent>
      <TabsContent value="payments">
        <StatsGrid type={type} year={year} />
        <Payments committee={committee} />
      </TabsContent>
    </Tabs>
  );
}
