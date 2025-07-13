import type { TEventType } from '@/app/types';
import { PaymentTabs } from '@/components/collections/payment-tabs';
import { ReceiverTotals } from '@/components/collections/receiver-totals';
import { AnnadaanList } from '@/components/events/annadaan/item-list';
import { SelectEventYear } from '@/components/events/select-event-year';
import Background from '@/components/layouts/background';
import { ReceiverLoader } from '@/components/layouts/receiver-loader';
import { Badge } from '@/components/ui/badge';
import { amountFormatter, slugify } from '@/lib/utils';
import { getTotalCollectionsBySlug } from '@/server/actions/booking.actions';
import { isCommitteeMember } from '@/server/actions/committee.actions';
import {
  getAllEventsByCommittee,
  getEventBySlug,
} from '@/server/actions/event.actions';
import { IndianRupee } from 'lucide-react';
import { Suspense } from 'react';

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

  const { data } = await getTotalCollectionsBySlug({
    slug: event?.slug ?? '',
    committee: 'cultural',
  });

  const { data: isMember } = await isCommitteeMember({ committee: 'cultural' });

  return (
    <Background className="items-start justify-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl capitalize">
          {type} - {year}
        </h1>

        <SelectEventYear events={events} type={type} year={year} />

        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">
            Total Collections
          </span>
          <div className="flex items-center font-bold text-2xl">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            {amountFormatter(data?.total ?? 0)}
            {type === 'ganpati' && (
              <span className="ml-2 text-muted-foreground text-sm">
                (Mahaprasad Count: {data?.totalQty ?? 0})
              </span>
            )}
          </div>
        </div>
        {!event?.is_active && (
          <Badge variant={'destructive'}>Event is not active!</Badge>
        )}
        {type === 'annadaan' && (
          <AnnadaanList isEventActive={!!event?.is_active} year={year} />
        )}
        {type === 'ganpati' && (
          <PaymentTabs
            committee="cultural"
            isMember={isMember}
            type={'ganpati'}
          />
        )}
        {isMember && type === 'ganpati' && (
          <Suspense fallback={<ReceiverLoader />}>
            <ReceiverTotals committee="cultural" />
          </Suspense>
        )}
      </div>
    </Background>
  );
}
