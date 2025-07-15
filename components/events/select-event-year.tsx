'use client';

import type { TEvent, TEventType } from '@/app/types';
import { SelectInput } from '@/components/inputs/select-input';
import { Form } from '@/components/ui/form';
import { customResolver } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { Badge } from '../ui/badge';

type Props = {
  events: TEvent[] | null | undefined;
  type: TEventType;
  year: number;
};

const formSchema = z.object({
  year: z.string().min(4),
});

export function SelectEventYear({ events, type, year }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: customResolver(formSchema),
    defaultValues: {
      year: year ? String(year) : '',
    },
  });

  if (!events?.length)
    return <Badge className="capitalize">No Events created yet!</Badge>;

  if (events.length <= 1) return;

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
