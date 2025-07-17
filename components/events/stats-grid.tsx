import type { TEventType } from '@/app/types';
import { slugify } from '@/lib/utils';
import { getTotalCollectionsBySlug } from '@/server/actions/booking.actions';
import { getTotalPaymentsBySlug } from '@/server/actions/payment.actions';
import { StatsCard } from './stats-card';

type Props = { type: TEventType; year: number };

export async function StatsGrid({ type, year }: Props) {
  const { data: collections } = await getTotalCollectionsBySlug({
    slug: `${slugify(type)}-${year}`,
  });
  const { data: payments } = await getTotalPaymentsBySlug({
    slug: `${slugify(type)}-${year}`,
  });

  return (
    <div className="my-4 flex w-full flex-col items-center gap-4 md:flex-row">
      <StatsCard
        showQty={type === 'ganpati'}
        title="Overall Collections"
        total={collections?.total ?? 0}
        totalQty={collections?.totalQty ?? 0}
      />
      <StatsCard
        title="Total Payments"
        total={payments?.total ?? 0}
        totalQty={0}
      />
      <StatsCard
        title="Remaining Balance"
        total={(collections?.total ?? 0) - (payments?.total ?? 0)}
        totalQty={0}
      />
    </div>
  );
}
