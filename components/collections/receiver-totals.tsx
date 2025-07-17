import type { TCommittee } from '@/app/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { amountFormatter, cn } from '@/lib/utils';
import { getCollectionsbyReceiver } from '@/server/actions/booking.actions';
import { isCommitteeMember } from '@/server/actions/committee.actions';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Props = {
  committee: TCommittee;
};

export async function ReceiverTotals({ committee }: Props) {
  const { data: isMember } = await isCommitteeMember({ committee });
  if (!isMember) return;

  const { data } = await getCollectionsbyReceiver({ committee });
  const collections = data?.sort((a, b) => b.remaining - a.remaining);

  return (
    <div className="my-4 w-full *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-secondary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="max-w-sm sm:max-w-md md:max-w-full ">
        <CardHeader>
          <CardTitle>Total Collections by Individual</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              A list of collections in individual accounts
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead className="text-right">Received</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections?.map((c) => (
                <TableRow
                  className={cn(c.receiver === 'Unknown' && 'text-destructive')}
                  key={c.receiver}
                >
                  <TableCell className="font-medium capitalize">
                    {c.receiver}
                  </TableCell>
                  <TableCell className="text-right">
                    {amountFormatter(c.received)}
                  </TableCell>
                  <TableCell className="text-right">
                    {amountFormatter(c.paid)}
                  </TableCell>
                  <TableCell className="text-right">
                    {amountFormatter(c.remaining)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
