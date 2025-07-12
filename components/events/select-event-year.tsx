'use client';

import type { TEvent, TEventType } from '@/app/types';
import { SelectInput } from '@/components/inputs/select-input';
import { Form } from '@/components/ui/form';
import { EVENT_TYPES } from '@/lib/constants';
import { customResolver, onlyUnique } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { Badge } from '../ui/badge';

type Props = {
  events: TEvent[] | null | undefined;
  type?: TEventType;
  year?: number;
};

const formSchema = z.object({
  type: z.enum(EVENT_TYPES),
  year: z.string().min(4),
});

export function SelectEventYear({ events, type, year }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: customResolver(formSchema),
    defaultValues: {
      type: type ?? 'ganpati',
      year: year ? String(year) : '',
    },
  });

  const [typ, yr] = form.watch(['type', 'year']);

  if (!events?.length)
    return <Badge className="capitalize">No Events created yet!</Badge>;

  const typeOptions = events
    .map((e) => e.type)
    .filter(onlyUnique)
    .map((e) => ({
      label: e,
      value: e,
    }));

  const yearOptions = events
    ?.filter((e) => e.type === typ)
    .map((e) => ({
      label: String(e.year),
      value: String(e.year),
    }));

  const handleChange = (val: string) => {
    if (typ) router.push(`/events/${typ}/${val}`);
  };

  const handleTypeChange = (val: string) => {
    if (yr) router.push(`/events/${val}/${yr}`);
  };

  return (
    <div className="my-4 flex items-center gap-4">
      <Form {...form}>
        <form className="flex gap-4">
          <SelectInput
            handleChange={handleTypeChange}
            label="Type"
            options={typeOptions ?? []}
            register={form.register('type')}
          />
          <SelectInput
            handleChange={handleChange}
            label="Year"
            options={yearOptions ?? []}
            register={form.register('year')}
          />
        </form>
      </Form>
    </div>
  );
}
