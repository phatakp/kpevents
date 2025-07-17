'use client';
import type { TItemWithBookings } from '@/app/types';
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
import { allAnnadaanBookingOptions } from '@/query-options/annadaan';
import { useQuery } from '@tanstack/react-query';
import { AnnadaanListItem } from './annadaan-list-item';
import { NewItemBtn } from './new-item-btn';

type Props = {
  year: number;
  isEventActive: boolean;
};

export function AnnadaanList({ year, isEventActive }: Props) {
  const { profile } = useAuthContext();
  const { data: items, isLoading } = useQuery(allAnnadaanBookingOptions(year));

  if (isLoading) return <ItemsLoader />;

  const totalRequired = items?.reduce((acc, b) => acc + b.amount, 0) ?? 0;
  const bookings = items?.sort((a, b) => sortCriteria(a, b));
  const totalBookings =
    items?.reduce(
      (acc, i) =>
        acc + i.bookings.reduce((bcc, b) => bcc + b.booking_qty * i.price, 0),
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
                  className="text-muted-foreground md:hidden"
                  colSpan={isEventActive ? 2 : 1}
                >
                  Total Required: ({bookings?.length ?? 0} items)
                </TableCell>
                <TableCell
                  className="hidden text-muted-foreground md:table-cell"
                  colSpan={isEventActive ? 3 : 1}
                >
                  Total Required: ({bookings?.length ?? 0} items)
                </TableCell>
                <TableCell>
                  <Amount amount={totalRequired} className="text-lg" />
                </TableCell>
              </TableRow>
              <TableRow>
                {isEventActive && <TableHead>Add</TableHead>}
                <TableHead className="w-[80px]">Item</TableHead>
                {isEventActive && (
                  <TableHead className="hidden text-right md:table-cell">
                    Available Qty
                  </TableHead>
                )}
                <TableHead className="text-right">Price/unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((item) => (
                <Collapsible asChild key={item.item_name}>
                  <AnnadaanListItem
                    isEventActive={isEventActive}
                    item={item}
                    year={year}
                  />
                </Collapsible>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function sortCriteria(a: TItemWithBookings, b: TItemWithBookings) {
  const t1 =
    a.quantity > (a?.bookings?.reduce((acc, b) => acc + b.booking_qty, 0) ?? 0)
      ? 1
      : 0;
  const t2 =
    b.quantity > (b?.bookings?.reduce((acc, b) => acc + b.booking_qty, 0) ?? 0)
      ? 1
      : 0;
  if (t1 === t2) return b.price * b.quantity < a.price * a.quantity ? -1 : 1;
  return t1 > t2 ? -1 : 1;
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
                <TableHead className="text-right">Available Qty</TableHead>
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
