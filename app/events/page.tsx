import { SelectEventYear } from '@/components/events/select-event-year';
import { getAllEventsByCommittee } from '@/server/actions/event.actions';

export default async function EventsPage() {
  const { data: events } = await getAllEventsByCommittee({
    committee: 'cultural',
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-4xl">Events</h1>
      <SelectEventYear events={events} />
      {/* <GanpatiTabs year={year} /> */}
    </div>
  );
}
