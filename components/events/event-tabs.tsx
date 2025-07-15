import type { TEventType } from '@/app/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { slugify } from '@/lib/utils';
import { isCommitteeMember } from '@/server/actions/committee.actions';
import {
  getAllEventsByType,
  getEventBySlug,
} from '@/server/actions/event.actions';
import Link from 'next/link';
import { Suspense } from 'react';
import { PaymentTabs } from '../collections/payment-tabs';
import { ReceiverTotals } from '../collections/receiver-totals';
import { ReceiverLoader } from '../layouts/receiver-loader';
import { Badge } from '../ui/badge';
import { AnnadaanList } from './annadaan/item-list';
import { SelectEventYear } from './select-event-year';

type Props = {
  type: TEventType;
  year: number;
};

export async function EventTabs({ type, year }: Props) {
  const { data: events } = await getAllEventsByType({
    type,
  });
  const { data: event } = await getEventBySlug({
    slug: `${slugify(type)}-${year}`,
  });
  const { data: isMember } = await isCommitteeMember({ committee: 'cultural' });

  return (
    <Tabs className="w-sm sm:w-full" defaultValue={type}>
      <TabsList>
        <TabsTrigger asChild value={'ganpati'}>
          <Link href={`/events/ganpati/${year}`}>Ganpati</Link>
        </TabsTrigger>
        <TabsTrigger asChild value={'annadaan'}>
          <Link href={`/events/annadaan/${year}`}>Annadaan</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={'ganpati'}>
        <div className="flex flex-col">
          {!event?.is_active && (
            <Badge variant={'destructive'}>Event is not active!</Badge>
          )}
          <SelectEventYear events={events} type={'ganpati'} year={year} />

          <PaymentTabs
            committee="cultural"
            isMember={isMember}
            type={'ganpati'}
            year={year}
          />
        </div>
        {isMember && type === 'ganpati' && (
          <Suspense fallback={<ReceiverLoader />}>
            <ReceiverTotals committee="cultural" />
          </Suspense>
        )}
      </TabsContent>
      <TabsContent value={'annadaan'}>
        <div className="flex flex-col">
          {!event?.is_active && (
            <Badge variant={'destructive'}>Event is not active!</Badge>
          )}
          <SelectEventYear events={events} type={'annadaan'} year={year} />

          <AnnadaanList isEventActive={!!event?.is_active} year={year} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
