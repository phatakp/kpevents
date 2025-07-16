'use client';

import type { TCommittee } from '@/app/types';
import { Modal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreatePaymentForm } from './create-payment-form';

type Props = { committee: TCommittee; isMember: boolean };

export function NewPaymentBtn({ committee, isMember }: Props) {
  if (!isMember) return;

  return (
    <Modal
      content={<CreatePaymentForm committee={committee} />}
      title="Add New Payment"
    >
      <Button className="rounded-md" size={'sm'}>
        <Plus />
        <span className="hidden sm:flex">New Payment</span>
      </Button>
    </Modal>
  );
}
