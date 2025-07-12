import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CommitteePayTabs() {
  return (
    <Tabs className="w-[400px] sm:w-full" defaultValue="cultural">
      <TabsList>
        <TabsTrigger value="cultural">Piccadilly Cultural</TabsTrigger>
        <TabsTrigger value="temple">Piccadilly Temple</TabsTrigger>
      </TabsList>
      <TabsContent value="cultural">
        Cultural
        {/* <CommitteeCard name="cultural" /> */}
      </TabsContent>
      <TabsContent value="temple">
        Temple
        {/* <CommitteeCard name="temple" /> */}
      </TabsContent>
    </Tabs>
  );
}
