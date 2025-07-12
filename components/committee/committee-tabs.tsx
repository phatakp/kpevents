import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommitteeCard } from './committee-card';

export function CommitteeTabs() {
  return (
    <Tabs className="w-[400px] sm:w-full" defaultValue="cultural">
      <TabsList>
        <TabsTrigger value="cultural">Piccadilly Cultural</TabsTrigger>
        <TabsTrigger value="temple">Piccadilly Temple</TabsTrigger>
      </TabsList>
      <TabsContent value="cultural">
        <CommitteeCard name="cultural" />
      </TabsContent>
      <TabsContent value="temple">
        <CommitteeCard name="temple" />
      </TabsContent>
    </Tabs>
  );
}
