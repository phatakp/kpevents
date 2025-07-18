import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnnadaanList } from './annadaan-list';

export function AnnadaanTabs({ year }: { year: number }) {
  return (
    <Tabs className="w-full" defaultValue={'available'}>
      <TabsList>
        <TabsTrigger value={'available'}>Available Items</TabsTrigger>
        <TabsTrigger value={'booked'}>Booked Items</TabsTrigger>
      </TabsList>
      <TabsContent value={'available'}>
        <div className="flex flex-col">
          <AnnadaanList available year={year} />
        </div>
      </TabsContent>
      <TabsContent value={'booked'}>
        <div className="flex flex-col">
          <AnnadaanList year={year} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
