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
import { amountFormatter } from '@/lib/utils';
import { getCollectionsbyReceiver } from '@/server/actions/booking.actions';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Props = {
  committee: TCommittee;
};

export async function ReceiverTotals({ committee }: Props) {
  const { data } = await getCollectionsbyReceiver({ committee });
  const collections = data?.sort((a, b) => b.total - a.total);
  return (
    <div className="w-full *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-secondary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
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
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections?.map((c) => (
                <TableRow key={c.receiver}>
                  <TableCell className="font-medium capitalize">
                    {c.receiver}
                  </TableCell>
                  <TableCell className="text-right">
                    {amountFormatter(c.total)}
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
