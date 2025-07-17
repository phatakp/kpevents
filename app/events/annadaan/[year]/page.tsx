import { AnnadaanList } from '@/components/events/annadaan/annadaan-list';
import Background from '@/components/layouts/background';
import { Badge } from '@/components/ui/badge';
import { getQueryClient } from '@/lib/react-query/get-query-client';
import { allAnnadaanBookingOptions } from '@/query-options/annadaan';
import { getEventBySlug } from '@/server/actions/event.actions';

type PageProps = {
  params: Promise<{ year: number }>;
};

export default async function AnnadaanPage({ params }: PageProps) {
  const { year } = await params;
  const queryClient = getQueryClient();
  const { data: event } = await getEventBySlug({
    slug: `annadaan-${year}`,
  });
  await queryClient.prefetchQuery(allAnnadaanBookingOptions(year));

  return (
    <Background className="items-start justify-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl capitalize">Annadaan - {year}</h1>

        {!event?.is_active && (
          <Badge variant={'destructive'}>Event is not active!</Badge>
        )}

        <AnnadaanList isEventActive={!!event?.is_active} year={year} />
      </div>
    </Background>
  );
}
