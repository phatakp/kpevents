'use client';

import type { TCommittee, TEventType } from '@/app/types';
import { Plus } from 'lucide-react';
import { Modal } from '../layouts/modal';
import { Button } from '../ui/button';
import { EventBookingForm } from './event-booking-form';

type Props = { committee: TCommittee; type: TEventType; isMember: boolean };

export function NewCollectionBtn({ committee, type, isMember }: Props) {
  if (!isMember) return;

  return (
    <Modal
      content={<EventBookingForm committee={committee} type={type} />}
      title="Add New Entry"
    >
      <Button className="rounded-md" size={'sm'}>
        <Plus />
        <span className="hidden sm:flex">New Entry</span>
      </Button>
    </Modal>
  );
}
