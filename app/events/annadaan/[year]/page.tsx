import { AnnadaanTabs } from '@/components/events/annadaan/annadaan-tabs';
import { SelectEventYear } from '@/components/events/select-event-year';
import Background from '@/components/layouts/background';
import { getQueryClient } from '@/lib/react-query/get-query-client';
import { allAnnadaanBookingOptions } from '@/query-options/annadaan';
import { eventBySlugOptions } from '@/query-options/events';

type PageProps = {
  params: Promise<{ year: number }>;
};

export default async function AnnadaanPage({ params }: PageProps) {
  const { year } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(eventBySlugOptions(`annadaan-${year}`));
  await queryClient.prefetchQuery(allAnnadaanBookingOptions(year));

  return (
    <Background className="items-start justify-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl capitalize">Annadaan - {year}</h1>

        <SelectEventYear committee="cultural" type={'annadaan'} year={year} />

        <AnnadaanTabs year={year} />

        {/* <AnnadaanList isEventActive={!!event?.is_active} year={year} /> */}
      </div>
    </Background>
  );
}
