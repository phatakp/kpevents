import type { TCommittee, TEventType } from '@/app/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BUILDINGS } from '@/lib/constants';
import { Collections } from './collections';

type Props = {
  type: TEventType;
  committee: TCommittee;
};

export function BuildingTabs({ type, committee }: Props) {
  return (
    <Tabs className="w-sm sm:w-full" defaultValue="A">
      <TabsList>
        {BUILDINGS.map((b) => (
          <TabsTrigger key={b} value={b}>
            {b}
          </TabsTrigger>
        ))}
      </TabsList>
      {BUILDINGS.map((b) => (
        <TabsContent key={b} value={b}>
          <Collections building={b} committee={committee} type={type} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
