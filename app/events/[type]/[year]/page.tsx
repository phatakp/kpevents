import type { TEventType } from '@/app/types';
import { EventTabs } from '@/components/events/event-tabs';
import Background from '@/components/layouts/background';

type PageProps = {
  params: Promise<{ year: number; type: TEventType }>;
};

export default async function GanpatiPage({ params }: PageProps) {
  const { year, type } = await params;

  return (
    <Background className="items-start justify-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl capitalize">
          {type} - {year}
        </h1>
        <EventTabs type={type} year={Number(year)} />
      </div>
    </Background>
  );
}
