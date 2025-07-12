import type { TEventType } from '@/app/types';
import { PaymentTabs } from '@/components/collections/payment-tabs';
import { AnnadaanList } from '@/components/events/annadaan/item-list';
import { SelectEventYear } from '@/components/events/select-event-year';
import { Badge } from '@/components/ui/badge';
import { slugify } from '@/lib/utils';
import {
  getAllEventsByCommittee,
  getEventBySlug,
} from '@/server/actions/event.actions';

type PageProps = {
  params: Promise<{ year: number; type: TEventType }>;
};

export default async function GanpatiPage({ params }: PageProps) {
  const { year, type } = await params;
  const { data: events } = await getAllEventsByCommittee({
    committee: 'cultural',
  });
  const { data: event } = await getEventBySlug({
    slug: `${slugify(type)}-${year}`,
  });

  if (!event) return;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-4xl capitalize">
        {type} - {year}
      </h1>

      <SelectEventYear events={events} type={type} year={year} />
      {!event.is_active && (
        <Badge variant={'destructive'}>Event is not active!</Badge>
      )}
      {type === 'annadaan' && (
        <AnnadaanList isEventActive={event.is_active} year={year} />
      )}
      {type === 'ganpati' && (
        <PaymentTabs committee="cultural" type={'ganpati'} />
      )}
    </div>
  );
}
