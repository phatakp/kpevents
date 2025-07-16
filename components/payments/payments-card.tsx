'use client';

import type { TCommittee } from '@/app/types';
import { Amount } from '@/components/layouts/amount';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { allPaymentOptions } from '@/query-options/payments';
import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { DataTable } from './data-table';
import { NewPaymentBtn } from './new-payment-btn';

type Props = { committee: TCommittee; isMember: boolean };

export function PaymentsCard({ committee, isMember }: Props) {
  const { data: payments } = useQuery(allPaymentOptions(committee));
  const total = payments?.reduce((acc, b) => acc + b.amount, 0) ?? 0;

  return (
    <div className="w-full *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-secondary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="max-w-sm sm:max-w-md md:max-w-full ">
        <CardHeader>
          <CardDescription className="capitalize">
            Total Payments from {committee} committee
          </CardDescription>
          <CardTitle>
            <Amount amount={total} />
          </CardTitle>
          <CardAction>
            <NewPaymentBtn committee={committee} isMember={isMember} />
          </CardAction>
        </CardHeader>

        {payments && payments.length > 0 && (
          <CardContent className="p-0">
            <DataTable columns={columns} data={payments} />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
