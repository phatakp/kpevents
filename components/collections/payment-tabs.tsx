import type { TCommittee, TEventType } from '@/app/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Payments } from '../payments/payments';
import { BuildingTabs } from './building-tabs';

type Props = {
  type: TEventType;
  committee: TCommittee;
};

export function PaymentTabs({ type, committee }: Props) {
  return (
    <Tabs className="w-[400px] sm:w-full" defaultValue="collections">
      <TabsList>
        <TabsTrigger value="collections">Collections</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
      </TabsList>
      <TabsContent value="collections">
        <div className="mt-4 grid gap-2">
          Choose the building
          <BuildingTabs committee={committee} type={type} />
        </div>
      </TabsContent>
      <TabsContent value="payments">
        <Payments committee={committee} />
      </TabsContent>
    </Tabs>
  );
}
