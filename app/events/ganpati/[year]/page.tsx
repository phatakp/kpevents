import { PaymentTabs } from '@/components/collections/payment-tabs';
import { ReceiverTotals } from '@/components/collections/receiver-totals';
import Background from '@/components/layouts/background';
import { ReceiverLoader } from '@/components/layouts/receiver-loader';
import { Badge } from '@/components/ui/badge';
import { getEventBySlug } from '@/server/actions/event.actions';
import { Suspense } from 'react';

type PageProps = {
  params: Promise<{ year: number }>;
};

export default async function GanpatiPage({ params }: PageProps) {
  const { year } = await params;
  const { data: event } = await getEventBySlug({
    slug: `ganpati-${year}`,
  });

  return (
    <Background className="items-start justify-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl capitalize">Ganpati - {year}</h1>

        {!event?.is_active && (
          <Badge variant={'destructive'}>Event is not active!</Badge>
        )}

        <PaymentTabs committee="cultural" type={'ganpati'} year={year} />

        <Suspense fallback={<ReceiverLoader />}>
          <ReceiverTotals committee="cultural" />
        </Suspense>
      </div>
    </Background>
  );
}
