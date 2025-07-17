'use client';
import { Amount } from '@/components/layouts/amount';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Collapsible } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { allTempleReqOptions } from '@/query-options/temple';
import { useQuery } from '@tanstack/react-query';
import { NewItemBtn } from './new-item-btn';
import { TempleListItem } from './temple-list-item';

type Props = {
  isEventActive: boolean;
};

export function TempleList({ isEventActive }: Props) {
  const { profile } = useAuthContext();
  const { data: items, isLoading } = useQuery(allTempleReqOptions());

  if (isLoading) return <ItemsLoader />;

  const totalRequired = items?.reduce((acc, b) => acc + b.amount, 0) ?? 0;
  const totalBookings =
    items?.reduce(
      (acc, i) =>
        acc + i.bookings.reduce((bcc, b) => bcc + b.booking_amount, 0),
      0
    ) ?? 0;

  return (
    <div className="*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="">
        <CardHeader>
          <CardDescription>Total Bookings Made</CardDescription>
          <CardTitle>
            <Amount amount={totalBookings} containerClass="justify-start" />
          </CardTitle>
          <CardAction>
            <NewItemBtn isAdmin={!!profile?.is_admin} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableCell
                  className="text-muted-foreground"
                  colSpan={isEventActive ? 2 : 1}
                >
                  Total Required: ({items?.length ?? 0} items)
                </TableCell>
                <TableCell>
                  <Amount amount={totalRequired} className="text-lg" />
                </TableCell>
              </TableRow>
              <TableRow>
                {isEventActive && <TableHead>Add</TableHead>}
                <TableHead className="w-[80px]">Item</TableHead>
                <TableHead className="text-right">Expected Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((item) => (
                <Collapsible asChild key={item.item_name}>
                  <TempleListItem isEventActive={isEventActive} item={item} />
                </Collapsible>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ItemsLoader() {
  return (
    <div className="*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="max-w-sm sm:max-w-md md:max-w-full">
        <CardHeader>
          <CardTitle>Total Bookings Made</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Item</TableHead>
                <TableHead className="text-right">Price/unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...new Array(10).keys()].map((item) => (
                <TableRow key={item}>
                  <TableCell>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-full" />
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
