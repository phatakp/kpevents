'use client';

import type { EventBookingFormSchema } from '@/app/schemas';
import type { TBuilding, TCommittee } from '@/app/types';
import { BUILDINGS } from '@/lib/constants';
import { committeeMemberOptions } from '@/query-options/committee';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import type { z } from 'zod/v4';
import { SelectInput } from './select-input';
import { TextInput } from './text-input';

type Props = { committee: TCommittee; bookingReceiver?: string };

export function ReceiverInput({ committee, bookingReceiver }: Props) {
  const { register, watch } =
    useFormContext<z.infer<typeof EventBookingFormSchema>>();
  const { data: members } = useQuery(committeeMemberOptions(committee));

  const memberOptions = (
    members?.map((m) => ({
      label: `${m.user.name} (${m.user.building}${m.user.flat})`,
      value: `${m.user.name} (${m.user.building}${m.user.flat})`,
    })) ?? []
  ).concat([{ label: 'Other', value: 'Other' }]);

  if (bookingReceiver) {
    const psplit = bookingReceiver.split(' (');
    if (psplit?.length === 2) {
      const building = psplit[1].charAt(0) as TBuilding;
      const flat = Number(psplit[1].slice(1, -1));
      if (
        !(
          members?.map((m) => m.user.building).includes(building) &&
          members?.map((m) => m.user.flat).includes(flat)
        )
      ) {
        memberOptions.push({
          label: bookingReceiver as string,
          value: bookingReceiver as string,
        });
      }
    }
  }

  const receiver = watch('receiver');

  return (
    <>
      <SelectInput
        label="Received By"
        options={memberOptions}
        register={register('receiver')}
      />

      {receiver === 'Other' && (
        <>
          <TextInput label="Receiver" register={register('otherPaidTo')} />
          <div className="flex gap-4">
            <SelectInput
              label="Receiver Building"
              options={buildingOptions}
              register={register('otherBuilding')}
            />
            <TextInput
              label="Receiver Flat"
              register={register('otherFlat')}
              type="number"
            />
          </div>
        </>
      )}
    </>
  );
}

const buildingOptions = BUILDINGS.map((b) => ({ label: b, value: b }));
