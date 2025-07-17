'use client';

import { Modal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AnnadaanItemForm } from './item-form';

type Props = { isAdmin: boolean };

export function NewItemBtn({ isAdmin }: Props) {
  if (!isAdmin) return;

  return (
    <Modal content={<AnnadaanItemForm />} title="Add Annadaan Item">
      <Button className="rounded-md" size={'sm'}>
        <Plus />
        <span className="hidden sm:flex">New Item</span>
      </Button>
    </Modal>
  );
}
