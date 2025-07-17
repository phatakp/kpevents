import { BuildingTabs } from '@/components/collections/building-tabs';
import { Payments } from '@/components/payments/payments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { StatsGrid } from '../stats-grid';
import { TempleList } from './temple-list';

type Props = {
  defaultOption?: 'collections' | 'payments' | 'requirements';
};

export function TempleTabs({ defaultOption }: Props) {
  return (
    <Tabs
      className="w-[400px] sm:w-full"
      defaultValue={defaultOption ?? 'collections'}
    >
      <TabsList>
        <TabsTrigger asChild value="collections">
          <Link href={'/temple/collections'}>Collections</Link>
        </TabsTrigger>

        <TabsTrigger asChild value="payments">
          <Link href={'/temple/payments'}>Payments</Link>
        </TabsTrigger>

        <TabsTrigger asChild value="requirements">
          <Link href={'/temple/requirements'}>Requirements</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="collections">
        <StatsGrid type={'temple'} year={new Date().getFullYear()} />
        <div className="grid gap-2">
          Choose the building
          <BuildingTabs committee={'temple'} type={'temple'} />
        </div>
      </TabsContent>

      <TabsContent value="payments">
        <StatsGrid type={'temple'} year={new Date().getFullYear()} />
        <Payments committee={'temple'} />
      </TabsContent>

      <TabsContent value="requirements">
        <StatsGrid type={'temple'} year={new Date().getFullYear()} />
        <TempleList isEventActive />
      </TabsContent>
    </Tabs>
  );
}
