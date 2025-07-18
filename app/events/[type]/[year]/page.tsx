import type { TEventType } from '@/app/types';
import { SelectEventYear } from '@/components/events/select-event-year';
import Background from '@/components/layouts/background';
import { Badge } from '@/components/ui/badge';
import { slugify } from '@/lib/utils';
import { getEventBySlug } from '@/server/actions/event.actions';

type PageProps = {
  params: Promise<{ year: number; type: TEventType }>;
};

export default async function EventPage({ params }: PageProps) {
  const { year, type } = await params;

  const { data: event } = await getEventBySlug({
    slug: `${slugify(type)}-${year}`,
  });

  return (
    <Background className="items-start justify-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl capitalize">
          {type} - {year}
        </h1>

        <SelectEventYear committee="cultural" type={type} year={year} />

        {!event?.is_active && (
          <Badge variant={'destructive'}>Event is not active!</Badge>
        )}

        {/* <AnnadaanList isEventActive={!!event?.is_active} year={year} /> */}
      </div>
    </Background>
  );
}
