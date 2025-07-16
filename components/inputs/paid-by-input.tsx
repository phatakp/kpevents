'use client';

import type { PaymentFormSchema } from '@/app/schemas';
import type { TBuilding, TCommittee } from '@/app/types';
import { BUILDINGS } from '@/lib/constants';
import { committeeMemberOptions } from '@/query-options/committee';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import type { z } from 'zod/v4';
import { SelectInput } from './select-input';
import { TextInput } from './text-input';

type Props = {
  committee: TCommittee;
  otherSender?: string;
  disabled?: boolean;
};

export function PaidByInput({ committee, otherSender, disabled }: Props) {
  const { register, watch } =
    useFormContext<z.infer<typeof PaymentFormSchema>>();
  const { data: members } = useQuery(committeeMemberOptions(committee));

  const memberOptions = (
    members?.map((m) => ({
      label: `${m.user.name} (${m.user.building}${m.user.flat})`,
      value: `${m.user.name} (${m.user.building}${m.user.flat})`,
    })) ?? []
  )?.concat([{ label: 'Other', value: 'Other' }]);

  if (otherSender) {
    const psplit = otherSender.split(' (');
    if (psplit?.length === 2) {
      const building = psplit[1].charAt(0) as TBuilding;
      const flat = Number(psplit[1].slice(1, -1));
      if (
        !(
          members?.map((m) => m.user.building).includes(building) &&
          members?.map((m) => m.user.flat).includes(flat)
        )
      ) {
        memberOptions?.push({
          label: otherSender as string,
          value: otherSender as string,
        });
      }
    }
  }

  const paidBy = watch('paid_by');

  return (
    <>
      <SelectInput
        disabled={disabled}
        label="Paid By"
        options={memberOptions}
        register={register('paid_by')}
      />

      {paidBy === 'Other' && (
        <>
          <TextInput label="Other Sender" register={register('otherPaidTo')} />

          <div className="flex gap-4">
            <SelectInput
              label="Sender Building"
              options={buildingOptions}
              register={register('otherBuilding')}
            />
            <TextInput
              label="Sender Flat"
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
