import type { TCommittee } from '@/app/types';
import { amountFormatter } from '@/lib/utils';
import { getAllPayments } from '@/server/actions/booking.actions';
import { isCommitteeMember } from '@/server/actions/committee.actions';
import { IndianRupee, Plus } from 'lucide-react';
import { Modal } from '../layouts/modal';
import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { columns } from './columns';
import { CreatePaymentForm } from './create-payment-form';
import { DataTable } from './data-table';

type Props = {
  committee: TCommittee;
};

export async function Payments({ committee }: Props) {
  const { data: isMember } = await isCommitteeMember({ committee });
  const { data: payments } = await getAllPayments({
    committee,
  });

  const total = payments?.reduce((acc, b) => acc + b.amount, 0) ?? 0;

  return (
    <div className="w-full *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-secondary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="max-w-sm sm:max-w-md md:max-w-full ">
        <CardHeader>
          <CardDescription className="capitalize">
            Total Payments from {committee} committee
          </CardDescription>
          <CardTitle>
            <div className="flex items-center">
              <IndianRupee className="size-4 text-muted-foreground" />
              <span className="font-semibold text-2xl">
                {amountFormatter(total)}
              </span>
            </div>
          </CardTitle>
          <CardAction>
            {isMember && (
              <Modal
                content={<CreatePaymentForm committee={committee} />}
                title="Add New Payment"
              >
                <Button className="rounded-md" size={'sm'}>
                  <Plus />
                  <span className="hidden sm:flex">New Payment</span>
                </Button>
              </Modal>
            )}
          </CardAction>
        </CardHeader>

        <CardContent className="p-0">
          <DataTable columns={columns} data={payments ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
