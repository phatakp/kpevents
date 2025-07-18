'use client';

import type { TCommittee, TEventType } from '@/app/types';
import { SelectInput } from '@/components/inputs/select-input';
import { Form } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { customResolver } from '@/lib/utils';
import { isMemberOptions } from '@/query-options/committee';
import { eventsByTypeOptions } from '@/query-options/events';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

type Props = {
  committee: TCommittee;
  type: TEventType;
  year: number;
};

const formSchema = z.object({
  year: z.string().min(4),
});

export function SelectEventYear({ type, year, committee }: Props) {
  const router = useRouter();
  const { data: events, isLoading: isEventsLoading } = useQuery(
    eventsByTypeOptions(type)
  );
  const { data: isMember, isLoading } = useQuery(isMemberOptions(committee));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: customResolver(formSchema),
    defaultValues: {
      year: year ? String(year) : '',
    },
  });

  if (isEventsLoading || isLoading) return <Skeleton className="h-9 w-32" />;

  if (!(isMember && events) || events.length < 2) return;

  const yearOptions = events.map((e) => ({
    label: String(e.year),
    value: String(e.year),
  }));

  const handleChange = (val: string) => {
    router.push(`/events/${type}/${val}`);
  };

  return (
    <div className="my-4 flex items-center gap-4">
      <Form {...form}>
        <form className="flex w-full max-w-sm gap-4">
          <SelectInput
            handleChange={handleChange}
            label="Select Year"
            options={yearOptions ?? []}
            register={form.register('year')}
          />
        </form>
      </Form>
    </div>
  );
}
